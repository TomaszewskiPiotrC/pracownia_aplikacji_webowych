__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Piotr Tomaszewski 4c"
import datetime
import json
import os
from typing import List

from sprawdzian.models.Teacher import Teacher
from sprawdzian.models.Subject import Subject
from sprawdzian.models.Student import Student
from sprawdzian.models.Grades import Grades
from sprawdzian.year_grade import year_grade

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

teachers: List[Teacher] = []
subjects: List[Subject] = []
students: List[Student] = []
grades: List[Grades] = []

with open(os.path.join(BASE_DIR, "teachers.txt"), encoding="utf-8") as f:
    for line in f:
        parts = line.strip().split()
        if len(parts) == 3:
            _id, name, surname = int(parts[0]), parts[1], parts[2]
            teachers.append(Teacher(_id, name, surname))

with open(os.path.join(BASE_DIR, "subjects.txt"), encoding="utf-8") as f:
    for line in f:
        parts = line.strip().split()
        if len(parts) == 3:
            _id, name, teacher_id = int(parts[0]), parts[1], int(parts[2])
            teacher_obj = next((t for t in teachers if t._id == teacher_id), None)
            if teacher_obj is None:
                continue
            subjects.append(Subject(_id, name, teacher_obj))

with open(os.path.join(BASE_DIR, "students.txt"), encoding="utf-8") as f:
    for line in f:
        parts = line.strip().split()
        if len(parts) == 4:
            _id, first_name, last_name, birthdate_str = int(parts[0]), parts[1], parts[2], parts[3]
            birth_date = datetime.datetime.strptime(birthdate_str, '%Y-%m-%d').date()
            students.append(Student(_id, first_name, last_name, birth_date))

with open(os.path.join(BASE_DIR, "grades.txt"), encoding="utf-8") as f:
    for line in f:
        parts = line.strip().split()
        if len(parts) == 3:
            student_id, subject_id = int(parts[0]), int(parts[1])
            grade_values = [int(g) for g in parts[2].split(",")]
            student_obj = next((s for s in students if s._id == student_id), None)
            subject_obj = next((s for s in subjects if s._id == subject_id), None)
            if student_obj is None or subject_obj is None:
                continue
            g = Grades(student_obj, subject_obj)
            for gv in grade_values:
                g.add_grade(gv)
            grades.append(g)

print("Oceny i średnie poszczególnych uczniów")

for student in students:
    print(f"{student}:")
    student_grades = [g for g in grades if g.student._id == student._id]
    for sg in student_grades:
        avg = round(sg.get_average(), 2)
        yr = year_grade(avg)
        grades_str = ", ".join(str(g) for g in sg.get_grades())
        print(f"\t{sg.subject.name}:")
        print(f"\t\tOceny: {grades_str}")
        print(f"\t\tŚrednia: {avg}")
        print(f"\t\tOcena końcowa: {yr}")
    print()

students_json_list = []
for student in students:
    student_grades = [g for g in grades if g.student._id == student._id]
    subject_dict = {}
    for sg in student_grades:
        avg = round(sg.get_average(), 2)
        yr = year_grade(avg)
        grades_str = ", ".join(str(g) for g in sg.get_grades())
        subject_dict[sg.subject.name] = {
            "Oceny": grades_str,
            "Srednia": avg,
            "Ocena roczna": yr
        }
    students_json_list.append({str(student): subject_dict})

with open(os.path.join(BASE_DIR, "students.json"), "w", encoding="utf-8") as f:
    json.dump(students_json_list, f, indent=4, ensure_ascii=False)

print("=" * 50)
print()

for subject in subjects:
    subject_grades_objs = [g for g in grades if g.subject._id == subject._id]
    all_grades: List[int] = []
    for sg in subject_grades_objs:
        all_grades.extend(sg.get_grades())
    avg = round(sum(all_grades) / len(all_grades), 2) if all_grades else 0.0
    grades_str = ", ".join(str(g) for g in all_grades)
    print(f"{subject.name}:")
    print(f"\tNauczyciel: {subject.teacher}")
    print(f"\tOceny: {grades_str}")
    print(f"\tŚrednia: {avg}")
    print()

subjects_json_list = []
for subject in subjects:
    subject_grades_objs = [g for g in grades if g.subject._id == subject._id]
    all_grades_list: List[int] = []
    for sg in subject_grades_objs:
        all_grades_list.extend(sg.get_grades())
    avg = round(sum(all_grades_list) / len(all_grades_list), 2) if all_grades_list else 0.0
    subjects_json_list.append({
        subject.name: {
            "Nauczyciel": str(subject.teacher),
            "Oceny": all_grades_list,
            "Srednia": avg
        }
    })

with open(os.path.join(BASE_DIR, "subjects.json"), "w", encoding="utf-8") as f:
    json.dump(subjects_json_list, f, indent=4, ensure_ascii=False)
