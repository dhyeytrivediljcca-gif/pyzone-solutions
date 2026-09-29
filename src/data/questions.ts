export interface Question {
  id: number;
  title: string;
  question: string;
  solutionAvailable: boolean;
  solution: string | null;
  category: string;
}

export const questions: Question[] = [
  {
    id: 1,
    title: "Swap Two Numbers Without Temporary Variable",
    question: "Write a program to swap two numbers without taking a temporary variable.",
    solutionAvailable: true,
    category: "Python Practical",
    solution: `a,b=(int(i) for i in input("enter a 2 number :-").split())
a,b=b,a
print(f"a={a} , b={b}")`,
  },
  {
    id: 2,
    title: "Student Class with display() Method",
    question:
      "Write a program to create a Student class with name, age and marks as data members. Also create a method named display() to view the student details. Create an object to Student class and call the method using the object.",
    solutionAvailable: true,
    category: "Python Practical",
    solution: `class Student:
    def __init__(self,name,age,marks):
        self.name=name
        self.age=age
        self.marks=marks

    def getdetails(self):
        print(f"name:{self.name} \\n age:{self.age} \\n marks:{self.marks}")

name=input("enter student name :-")
age,marks=int(input("enter age :-")),int(input("enter marks :-"))

s1=Student(name,age,marks)
s1.getdetails()`,
  },
  {
    id: 3,
    title: "Array Class Methods",
    question:
      "Write a program to understand various methods of array class mentioned: append, insert, remove, pop, index, tolist and count.",
    solutionAvailable: true,
    category: "Python Practical",
    solution: `import array

arr=array.array("i",[10,20,30,40])
print(type(arr))

arr.append(50) #add elements in last of the array
arr.insert(60) #insert array element has two argument (index,value)
arr.remove(30) # remove first 30 from array element
popped=arr.pop() # remove last element from the array and return it
arr.index(40) # gives the index number of an element
arr.count(10) #count the particular element in array
arr.tolist() # array convert to list`,
  },
  {
    id: 4,
    title: "Handle ZeroDivisionError Exception",
    question: "Write a program to handle some built in exceptions like ZeroDivisionError.",
    solutionAvailable: true,
    category: "Python Practical",
    solution: `try:
    a,b=10/0
    print("result",a/b)

except ZeroDivisionError:
    print("error:division by zero is not possible !")`,
  },
  {
    id: 5,
    title: "Common and Non-Common Elements Using Membership Operator",
    question:
      "Write a program to find out and display the common and the non common elements in the list using membership operator.",
    solutionAvailable: true,
    category: "Python Practical",
    solution: `list1=[10,20,30]
list2=[30,40,50]

common=[x for x in list1 if x in list2]
non_common=[x for x in list1+list2 if x not in common]

print("common elements are :",common)
print("non-common elements are :",non_common)`,
  },
  {
    id: 6,
    title: "Student Class with Parameterized Constructor",
    question:
      "Write a program to create Student class with a constructor having more than one parameter.",
    solutionAvailable: true,
    category: "Python Practical",
    solution: `class Student:
    def __init__(self,name,roll,div):
        self.name=name
        self.roll=roll
        self.div=div

    def getdetails(self):
        print(f"name :{self.name}\\nrollno: {self.roll}\\ndiv:{self.div}")

name="dhyey"
roll=191
div="b"

student=Student(name,roll,div)
student.getdetails()`,
  },
  {
    id: 7,
    title: "Remove Repeated Items from a List",
    question:
      "Write a python program that removes any repeated items from a list so that each item appears at most once. For instance, the list [1,1,2,3,4,3,0,0] would become [1,2,3,4,0].",
    solutionAvailable: true,
    category: "Python Practical",
    solution: `lst = [1,1,2,3,4,3,0,0]

unique = list(dict.fromkeys(lst)) # BUILT IN KIT FOR REMOVING DUPLICATE ITEMS IN PYTHON

print("Original list:", lst)
print("List without duplicates:", unique)`,
  },
  {
    id: 8,
    title: "Evaluate Expression Using eval()",
    question:
      "Write a program that evaluates an expression given by the user at run time using eval() function.\n\nExample:\nEnter an expression: 10+8-9*2-(10*2)\nResult: -20",
    solutionAvailable: true,
    category: "Python Practical",
    solution: `print("if you multiply with brackets please define it '**' for example 10*(1/2)")
print(eval(input("enter a expression: ")))`,
  },
  {
    id: 9,
    title: "Single Inheritance with Two Sub Classes",
    question:
      "Write a program to implement single inheritance in which two sub classes are derived from a single base class.",
    solutionAvailable: false,
    solution: null,
    category: "Python Practical",
  },
  {
    id: 10,
    title: "Lambda Function to Find Bigger Number",
    question:
      "Write a lambda/Anonymous function to find bigger number in two given numbers.",
    solutionAvailable: true,
    category: "Python Practical",
    solution: `bigger=lambda a,b:a if a>b else b
print("bigger number ",bigger(15,49))`,
  },
  {
    id: 11,
    title: "Centimeters to Inches Converter with Validation",
    question:
      "Write a python program that asks the user to enter a length in centimeters. If the user enters a negative length, the program should tell the user that the entry is invalid. Otherwise, the program should convert the length to inches and print out the result. (2.54 = 1 inch).",
    solutionAvailable: true,
    category: "Python Practical",
    solution: `length_cm=int(input("enter lenght in cm :"))

if length_cm<0:
    print("Invalid Entry :length should not be negative...!")

else:
    print(f"length in inches {length_cm/2.54:.2f}")`,
  },
  {
    id: 12,
    title: "Method Resolution Order (MRO)",
    question:
      "Write a program to understand the order of execution of methods in several base classes according to method resolution order (MRO).",
    solutionAvailable: false,
    solution: null,
    category: "Python Practical",
  },
  {
    id: 13,
    title: "List Methods: append, insert, copy, extend, count, remove, pop, sort, reverse, clear",
    question:
      "Create a sample list of 7 elements and implement the List methods mentioned: append, insert, copy, extend, count, remove, pop, sort, reverse and clear.",
    solutionAvailable: true,
    category: "Python Practical",
    solution: `list1=[10,20,30,40,50,60,70]

list1.append(80)
list1.insert(2,21)
list1.count(30)
list1.remove(10)
list1.pop()
list1.sort()
list1.reverse()
list1.clear()

print(list1)`,
  },
  {
    id: 14,
    title: "Handle Multiple Exceptions: SyntaxError and TypeError",
    question:
      "Write a program to handle multiple exceptions like SyntaxError and TypeError.",
    solutionAvailable: true,
    category: "Python Practical",
    solution: `try:
    a=2
    b="2"
    print(a+b)

except TypeError:
    print("string not be concated with integer...!")

except SyntaxError:
    print("syntax error in python ")`,
  },
  {
    id: 15,
    title: "Search Element in List Using For Loop with Else Suite",
    question:
      'Write a program to search an element in the list using for loop and also demonstrate the use of "else" suite with for loop.',
    solutionAvailable: true,
    category: "Python Practical",
    solution: `lst=[12,24,36,48]

target=int(input("enter number to find :"))

for i in lst:
    if i==target:
        print(f"number {target} found in list")
        break
else:
    print("item not found in list")`,
  },
  {
    id: 16,
    title: "Static Method to Count Class Instances",
    question:
      "Write a program to create a static method that counts the number of instances created for a class.",
    solutionAvailable: true,
    category: "Python Practical",
    solution: `class Student:
    count=0

    def __init__(self):
        Student.count+=1

    @staticmethod
    def total_instances():
        return Student.count

s1,s2,s3=Student(),Student(),Student()

print("totals object/instance in the programs are",Student.total_instances())`,
  },
  {
    id: 17,
    title: "Convert Two Lists into Dictionary Key-Value Pairs",
    question:
      "Write a program to convert the elements of two lists into key-value pairs of a dictionary.",
    solutionAvailable: true,
    category: "Python Practical",
    solution: `keys=["name","age","city"]
values=["dhyey",19,"rajkot"]

result=dict(zip(keys,values))

print(result)`,
  },
];

export const totalQuestions = questions.length;
export const availableSolutions = questions.filter((q) => q.solutionAvailable).length;
export const comingSoonCount = questions.filter((q) => !q.solutionAvailable).length;
