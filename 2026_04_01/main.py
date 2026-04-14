class Course:
    def __init__(self, name):
        self.name = name

class Student:
    def __init__(self, id, first_name, last_name, age):
        self.id = id
        self.first_name = first_name
        self.last_name = last_name
        self.age = age
        self.courses = []

with open("students.txt", encoding="utf-8") as f:
    students = {}
    for line in f:
        parts = line.strip().split(",")
        s = Student(int(parts[0]), parts[1], parts[2], int(parts[3]))
        students[s.id] = s

with open("courses.txt", encoding="utf-8") as f:
    for line in f:
        parts = line.strip().split(",")
        student_id, course_name = int(parts[0]), parts[1]
        if student_id in students:
            students[student_id].courses.append(Course(course_name))

for s in students.values():

    filename = f"{s.first_name.lower()}_{s.last_name.lower()}.txt"
    with open(filename, "w", encoding="utf-8") as f:
        course_lines = "\n".join(f"- {c.name}," for c in s.courses)
        f.write(f"Kursy: \n{course_lines}\n")
