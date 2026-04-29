__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Piotr Tomaszewski 4c"
from typing import List
from sprawdzian.models.Student import Student
from sprawdzian.models.Subject import Subject


class Grades:
    def __init__(self, student: Student, subject: Subject) -> None:
        self.grades: List[int] = []
        self.student: Student = student
        self.subject: Subject = subject

    def add_grade(self, grade: int) -> None:
        if grade < 1 or grade > 6:
            raise ValueError("Grade must be between 1 and 6")
        self.grades.append(grade)

    def get_grades(self) -> List[int]:
        return self.grades

    def get_average(self) -> float:
        if not self.grades:
            return 0.0
        return sum(self.grades) / len(self.grades)
