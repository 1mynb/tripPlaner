# Trip Planner

## Description 
  
This project is developed to help drivers plan their trip. They provide their current location, pickup location , drop location and current cycle hours used by the drivers. Then the system shows the appropriate routes and other detail if the trip is valid as per HRS of FMRS. It also drows the log sheet automatically based on the inputs provided by the driver. The project is developed in Django and react.

---
## Requirements
### Python Scripts

    * Allowed editors: vi, vim, emacs
    * All your files will be interpreted/compiled on Ubuntu 14.04 LTS using python3 (version 3.4.3)
    * All your files should end with a new line
    * The first line of all your files should be exactly #!/usr/bin/python3
    * A README.md file, at the root of the folder of the project, is mandatory
    * Your code should use the PEP 8 style (version 1.7 or more)
    * All your files must be executable
    * The length of your files will be tested using wc
    * All your modules should have a documentation (python3 -c 'print(__import__("my_module").__doc__)')
    * All your classes should have a documentation (python3 -c 'print(__import__("my_module").MyClass.__doc__)')
    * All your functions (inside and outside a class) should have a documentation (python3 -c 'print(__import__("my_module").my_function.__doc__)' and python3 -c 'print(__import__("my_module").MyClass.my_function.__doc__)')
    * A documentation is not a simple word, it’s a real sentence explaining what’s the purpose of the module, class or method (the length of it will be verified)

### Python Unit Tests

    * Allowed editors: vi, vim, emacs
    * All your files should end with a new line
    * All your test files should be inside a folder tests
    * You have to use the unittest module
    * All your test files should be python files (extension: .py)
    * All your test files and folders should start by test_
    * Your file organization in the tests folder should be the same as your project
    * All your tests should be executed by using this command: python3 -m unittest discover tests
    * You can also test file by file by using this command: python3 -m unittest tests/test_models/test_base_model.py
    * All your modules should have a documentation (python3 -c 'print(__import__("my_module").__doc__)')
    * All your classes should have a documentation (python3 -c 'print(__import__("my_module").MyClass.__doc__)')
    * All your functions (inside and outside a class) should have a documentation (python3 -c 'print(__import__("my_module").my_function.__doc__)' and python3 -c 'print(__import__("my_module").MyClass.my_function.__doc__)')

---

## How the project works

   * first the project displays a prompt message for the user
   * It then reads the strings inputed by the user
   * It then splits the string into words
   * It takes the first word as a command and then finds the appropriate do handler to execute the command
   * if the first word is not identfied, it calls the default handler to execute the user instruction
   * Finally after execution, the final output will be displayed back to the user

---

## modes of operation

The project works in interactive mode and non-interactive mode as shown below.

### interactive modes of operaton

The interactive mode allows the user to write the command once they are in the prompt in the interactive way as shown in the example below


``` help command ```:
```
(hbnb) help

Documented commands (type help <topic>):
========================================
EOF  all  clear  create  destroy  help  quit  show  update

(hbnb) 

```

### non-interactive modes of operation

The non-interactive mode allows the user to write the command once they are outside of the prompt just like any linux command as shown in the example below


``` help command ```:
```
beniyaml@ubuntu:~/ALX/AirBnB_clone$ echo "help" | ./console.py
(hbnb) 
Documented commands (type help <topic>):
========================================
EOF  all  clear  create  destroy  help  quit  show  update

(hbnb) beniyaml@ubuntu:~/ALX/AirBnB_clone$ 

```
--- 

## Usage

   * Download the source code from the github repository
   * Run the project by writing ./console.py if you want to execute in the interactive mode 
   * While the system prompts the user, write the required command
   * Or run the project by concatenating other commands with ./console.py if you want in non-interactive mode
   * Finally the system will display the approprate out put to the user
   * When you want to exit the system, type quit or EOF in the interactive mode

---

## Available commands

|commands  | Description |
---        |---          |
EOF        | command used to exit the system
all        | command used to see the avilable instance
clear      | command used to clear the screen
create     | command used to create a new class instance
destroy    | command used to delete the instance
help       | command used to show how the commands will be used in the system
quit       | command used to quit the system
show       | command used to show information about the instance
update     | command used to update the instance
---

## Avilable classes

|class name | attribute | Descritpiton |
---         | ---       | ---          |
BaseModel   | id, created_at, updated_at | a class that defines all common attributes/methods for other classes
User        | email, password, first_name, last_name | a class that defines attributes and methods of user
Stat        | name     | a class that defiens attributes and methods of the state
City        | state_id, name | a class that defines attributes and methods of teh city
Amenity     | name    | a class that defines attributes and methods of teh amenity
Place       | city_id, user_id, name, description, number_rooms, number_bathrooms, max_guest, price_by_night, latitude, longitude, amenity_ids | a class that defines attributes and methods of the room
Review      | place_id, user_id, text | a class that defines attributes and methods of the review
---

## Examples

``` all ```:
```
(hbnb) all BaseModel
["[BaseModel] (14248257-b9ad-4b83-9bb2-18357b85711c) {'id': '14248257-b9ad-4b83-9bb2-18357b85711c', 'updated_at': datetime.datetime(2021, 6, 27, 23, 29, 6, 181349), 'created_at': datetime.datetime(2021, 6, 27, 23, 29, 6, 181321), '__class__': 'BaseModel'}"]
(hbnb) 
```

```
(hbnb) BaseModel.all()
["[BaseModel] (14248257-b9ad-4b83-9bb2-18357b85711c) {'id': '14248257-b9ad-4b83-9bb2-18357b85711c', 'updated_at': datetime.datetime(2021, 6, 27, 23, 29, 6, 181349), 'created_at': datetime.datetime(2021, 6, 27, 23, 29, 6, 181321), '__class__': 'BaseModel'}"]
(hbnb) 
```

```
(hbnb) all MyModel
** class doesn't exist **
(hbnb) 

```

```create ```:
```
(hbnb) create User
e6fece50-6c8a-456d-bb69-a1c474322db0
(hbnb)
```

```
(hbnb) create usr
** class doesn't exist **
(hbnb)
```

``` destroy ```:
```
(hbnb) User.destroy("e6fece50-6c8a-456d-bb69-a1c474322db0")
(hbnb)
```

```
(hbnb) destroy User e6fece50-6c8a-456d-bb69-a1c474322db0
(hbnb)

```

```help```:
```
(hbnb) help

Documented commands (type help <topic>):
========================================
EOF  all  clear  create  destroy  help  quit  show  update

(hbnb) 

```

```
(hbnb) help create
Creates a new instance
(hbnb) 
```
```quit```:
```
(hbnb) quit
beniyaml@ubuntu:~/ALX/AirBnB_clone$ 
```

```show```:
```
(hbnb) show
** class name missing **
(hbnb)
```

```
(hbnb) show User
** instance id missing **
(hbnb) 
```

```
(hbnb) show User a6a16632-cdad-4431-9190-db5a7a8e081b
[User] (a6a16632-cdad-4431-9190-db5a7a8e081b) {'password': 'root', 'updated_at': datetime.datetime(2021, 6, 27, 23, 47, 14, 512655), '__class__': 'User', 'id': 'a6a16632-cdad-4431-9190-db5a7a8e081b', 'first_name': 'John', 'email': 'airbnb2@holbertonshool.com', 'created_at': datetime.datetime(2021, 6, 27, 23, 47, 14, 512640)}
(hbnb)
```

```
(hbnb) User.show("a6a16632-cdad-4431-9190-db5a7a8e081b")
[User] (a6a16632-cdad-4431-9190-db5a7a8e081b) {'email': 'airbnb2@holbertonshool.com', 'id': 'a6a16632-cdad-4431-9190-db5a7a8e081b', 'first_name': 'John', '__class__': 'User', 'updated_at': datetime.datetime(2021, 6, 27, 23, 47, 14, 512655), 'password': 'root', 'created_at': datetime.datetime(2021, 6, 27, 23, 47, 14, 512640)}
(hbnb) 

```

```update```:
```
(hbnb) update
** class name missing **
(hbnb) 
```

```
(hbnb) update User
** instance id missing **
(hbnb) 

```

```
(hbnb) update User a6a16632-cdad-4431-9190-db5a7a8e081b
** attribute name missing **
(hbnb)
```

```
(hbnb) update User a6a16632-cdad-4431-9190-db5a7a8e081b email
** value missing **
(hbnb)
```

```
(hbnb) update User a6a16632-cdad-4431-9190-db5a7a8e081b email "holbeton@gmai.com"
(hbnb)
```

```
(hbnb) User.update("a6a16632-cdad-4431-9190-db5a7a8e081b", {'email' : "holbeton@gmai.com", 'first_name' : "Betty"})
(hbnb)
```
---

## Authors
* **Dawit Hagos** - [dwthgs] from github account  https://github.com/dwthgs
* **Beniyam Legesse** - [beniyaml] from github account  https://github.com/beniyaml
