// let x = 3245;
// x = 'string'  // can't re assign type

let x: boolean = true;
let xx: boolean | number | string | string[] | object =
  "any given type can be assigned";
let y: string = "slkdfj";
let z: number = 789;

let a: 10 | 20 | "stringValue" = "stringValue";
// ye 3 value ke alawa esme kuch or nhi ja sakta -> ye 3 value hi eska type ho gya

// suggestion error earlier
// y++; // error
// z.length // error

let numArr: number[] = [1, 2, 3];
let numStrArr: (number | string)[] = [1, 3, "string"];
let strArr: string[] = ["abc", "bdc"];

let tuple: [string, string, string] = ["abc", "cde", "third string"];
let tuple2: [string, number, boolean] = ["abc", 234, true];
// it will have exactly 3 value of type string

type UserObj = { name: string; age: number; college?: string };
// creating a type object
type Student = {
    rollNumber : number
}

type StudentUser = UserObj & Student;

const obj: { name: string; age: number; college?: string } = {
  name: "Raj",
  age: 22,
};

obj.college = "sting";
// obj.newKey = 123; // it will be added to the object but it's an error for ts

const obj2: UserObj = {
  name: "Raj",
  age: 22,
};

const student : StudentUser = {
    name : "exp", 
    rollNumber : 1, 
    age : 21, 
}


function sum(x : number, y : number) : number {
    return x+y;
}

type Openings = {
    title : string,
    desc : string
}

type Company = {
    name : string, 
    descrip : string
}

type X = {
    company : Company
}

type OWC = {
    title : string,
    desc : string
    company : Company
}

type OpeningsWithCompany = Openings & X

async function searchParams() {
    return {
        id : "string",
        title : "string"
    }
}
