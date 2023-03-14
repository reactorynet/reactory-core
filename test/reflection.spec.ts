
import { format } from 'path';
import Reactory from '../src/types';
import ReactoryStatic, { title, min, max, nullable, pattern, defaultValue } from '../src/Reactor';

const staticJSON = {
  "$type": "MyUser",
  "type": "object",
  "properties": {
    "props": {
      "$type": "Object",
      "type": "object",
      "properties": {}
    },
    "firstName": {
      "$type": "String",
      "type": "string ",
      "title": "MyUser.firstName",
      "minLength": 3,
      "maxLength": 100
    },
    "lastName": {
      "$type": "String",
      "type": "string ",
      "title": "MyUser.lastName",
      "minLength": 3,
      "maxLength": 100
    },
    "avatar": {
      "$type": "String",
      "type": [
        "string ",
        "null"
      ],
      "title": "MyUser.avatar"
    },
    "avatarProvider": {
      "$type": "String",
      "type": [
        "string ",
        "null"
      ],
      "title": "MyUser.avatarProvider"
    },
    "dateOfBirth": {
      "$type": "Date",
      "type": "string",
      "format": "date-time",
      "title": "MyUser.dateOfBirth",
      "minimum": "1970-01-01",
      "maximum": "today"
    },
    "userContact": {
      "$type": "MyUserContact",
      "type": [
        "object",
        "null"
      ],
      "properties": {
        "email": {
          "$type": "String",
          "type": [
            "string ",
            "null"
          ],
          "title": "MyUserContact.email",
          "maxLength": 150
        },
        "mobileNumber": {
          "$type": "String",
          "type": [
            "string ",
            "null"
          ],
          "title": "MyUserContact.mobileNumber",
          "maxLength": 20,
          "pattern": {}
        }
      },
      "title": "MyUser.contactDetails"
    }
  }
};

export namespace ReflectionUnitTest {

  interface MyUserContactConstructorArgs {
    email?: string
    mobileNumber?: string
  }

  interface MyUserConstructorArgs {
    firstName?: string
    lastNamme?: string
    dateOfBirth?: Date
    avatar?: string
    avatarProvider?: string,
    userContact?: MyUserContactConstructorArgs
  }


  export class MyUserContact implements Reactory.Models.IUserContact {

    @title('MyUserContact.email')
    @nullable()
    @min(0)
    @max(150)
    email?: string;

    @title('MyUserContact.mobileNumber')
    @nullable()
    @min(0)
    @max(20)
    @pattern(/^\+[1-9]\d{0,2}-\d{1,12}$/)
    mobileNumber?: string;

    constructor(args: MyUserContactConstructorArgs) {
      this.email = args.email;
      this.mobileNumber = args.mobileNumber;
    }
  }

  export class MyUser implements Reactory.Models.IUserBio {
    @title("MyUser.firstName")
    @min(3)
    @max(100)
    firstName: string = '';

    @title("MyUser.lastName")
    @min(3)
    @max(100)
    lastName: string = '';

    @title("MyUser.dateOfBirth")
    @min("1970-01-01")
    @max("today")
    dateOfBirth?: Date;

    @title("MyUser.avatar")
    @nullable()
    avatar?: string;

    @title("MyUser.avatarProvider")
    @nullable()
    avatarProvider?: string;

    @title("MyUser.contactDetails")
    @nullable()
    userContact: MyUserContact;

    @title("MyUser.userStatus")
    @defaultValue('NEW')
    userStatus: string


    constructor(public props: MyUserConstructorArgs) {
      this.firstName = props?.firstName || "";
      this.lastName = props?.lastNamme || "";
      this.avatar = props?.avatar || "";
      this.avatarProvider = props?.avatarProvider || "";
      this.dateOfBirth = props?.dateOfBirth || new Date(1970);
      this.userContact = new MyUserContact({
        email: props?.userContact?.email || "",
        mobileNumber: props?.userContact?.email || ""
      })
    }

  }

}

//@ts-ignore
global.ReflectionUnitTest = ReflectionUnitTest;

describe('Reflection', () => {

  it('Checks schema generator', () => {
    //@ts-ignore
    const instance: ReflectionUnitTest.MyUser = ReactoryStatic.Reflection.getInstance(ReflectionUnitTest.MyUser, {});
    //@ts-ignore
    const schema = ReactoryStatic.Reflection.reflectSchema<ReflectionUnitTest.MyUser>(instance);
    const schemaString = JSON.stringify(schema, null, 2);
    expect(schemaString).toEqual(JSON.stringify(staticJSON, null, 2));  
  })
});