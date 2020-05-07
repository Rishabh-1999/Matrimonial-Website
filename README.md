<img src="https://www.chitkara.edu.in/chitkara-university-logo.png" />

# Matrimonial-Website

A matrimonial website with a custom inbuilt Recommender system for finding a suitable bride or groom. Recommender system will use many attributes to find a suitable partner according to specification or data entered.

This was made for **Chitkara University** as a Project for AWS Course.

```
npm start or node app.js
```

It will run under the url http://127.0.0.1:3000/ 

Email and Password for Online Website:<br>

## Pre-requisites

- Node JS (Tested on v12.14.0)
- MongooseDB
- MongooseDB Compass (Optional)
- Pre-requisites or Dependencies (Defined Below)

## Role
- Currently are there are two Roles defined.
- User
  - Update Profile
  - Search Profile
  - Use Recommeder to find parnter
- Admin
  - Manage Users

# Recommendation System
A a recommendation system is a subclass of information filtering system that seeks to predict the "rating" or "preference" a user would give to an item.

Here we used **Hybrid Recommendation System** combining collaborative filtering and content-based filtering. In this type of system more User *searches* , better the recommendation .Everytime user searches the data is used to improve the recommendation of particular user. Every user has their own recommendation data. Recommendation is based many factors shown in below table and how their evaluation is done.


## Schema

<h4><b>Users Schema</b></h4>

| Name                    | Type            | Required | Unique | Encrpyted |
| ----------------------- | --------------- | -------- | ------ | --------- |
| firstname               | String          | Yes      | No     | No        |
| email                   | String          | Yes      | Yes    | No        |
| gender                  | String          | Yes      | No     | No        |
| password                | String          | Yes      | No     | Yes       |
| photourl                | String          | Yes      | No     | No        |
| peronaldetails          | Reference       | Yes      | No     | No        |
| recommendationdetails   | Reference       | Yes      | No     | No        |
| type ( Role )           | String          | Yes      | No     | No        |
| isVerfied               | Bollean       | Yes      | No     | No        |
| isActive                | Bollean       | Yes      | No     | No        |

<h4><b>Personal Details Schema</b></h4>

| Name            | Type      | Required |
| --------------- | --------- | -------- |
| middlename      | String    | No       |
| lastname        | String    | Yes      |
| religion        | String    | No       |
| DOB             | String    | Yes      |
| age             | Number    | Yes      |
| mothertongue    | String    | No       |
| phoneno         | String    | No       |
| education       | String    | No       |
| height          | String    | No       |
| weight          | String    | No       |
| address1        | String    | No       |
| city            | String    | No       |
| state           | String    | No       |
| isDoingJob      | Bollean   | No       |
| user            | Reference | No       |

<h4><b>recommendation Schema</b></h4>

| Name            |     Type        |
| --------------- | --------------- |
| user            | Reference       | 
| religion        | Array of Object |
| minage          | Number          |
| maxage          | String          |
| education       | Array of Object |

<h5><b>religion Object</b></h5>

```bash
  religion: [{
      name: {
        type: String,
      },
      count: {
        type: Number
      }
    }]
```

<h5><b>education Object</b></h5>

```bash
  education: [{
      name: {
        type: String,
      },
      count: {
        type: Number
      }
    }],
```

## Dependencies

- Express

```
npm install express
```

- EJS-Mate

```
npm install ejs-mate
```

- Path

```
npm install path
```

- Serve Favicon

```
npm install serve-favicon
```

- Connect Mongo

```
npm install connect-mongo
```

- Express-Session

```
npm install express-session
```

- Morgan

```
npm install morgan
```

- Mongoose

```
npm install mongoose
```

- Body Parser

```
npm install body-parser
```

- Dotenv

```
npm install dotenv
```

- Bcrpty

```
npm install bcrpty
```

## Directory

```bash
|___ Root
|   |--- app.js
|   |
|   |--- Procfile ( Heroku File )
|   |
|   |--- .env ( Enviroment File )
|   |
|   |--- config
|   |    |--- db.js
|   |    |--- utils.js
|   |
|   |--- Controller
|   |    |--- index.js
|   |    |--- admin.js
|   |    |--- recommendation.js
|   |    |--- users.js
|   |
|   |--- Dump (Mongoose Dump) (Dump)
|   |
|   |--- Middleware
|   |    |--- middleware.js
|   |
|   |--- Models
|   |    |--- personaldetails.js
|   |    |--- recommendation.js
|   |    |--- users.js
|   |
|   |--- Public
|   |    |--- css (Static)
|   |    |--- images (Static)
|   |    |--- script
|   |    |    |--- bootstrap.min.js
|   |    |    |--- datatables.js
|   |    |    |--- datatables.min.js
|   |    |    |--- editprofile-js.js
|   |    |    |--- home-js.js
|   |    |    |--- login-js.js
|   |    |    |--- manage_user-js.js
|   |    |    |--- searchpage.js
|   |    |    |--- userRegister.js
|   |    |
|   |    |--- index.html
|   |
|   |--- router
|   |    |--- admin.js
|   |    |--- userstable.js
|   |
|   |--- views
|   |    |--- partials
|   |    |    |--- navbar.ejs
|   |    |
|   |    |--- adddetails.ejs
|   |    |--- editprofile.ejs
|   |    |--- home.ejs
|   |    |--- login.ejs
|   |    |--- manage_people.ejs
|   |    |--- registerUser.ejs
|   |    |--- searchpage.ejs
```

## Contributers

<table>
  <tr>
    <td style="margin:10px;padding:10px;">
      <div style="box-shadow:0 4px 8px 0 rgba(0,0,0,0.2); transition: 0.3s; border-radius: 5px;">
        <img src="https://avatars3.githubusercontent.com/u/38128234?v=4" alt="Avatar" style="width:200px; height:200px; border-radius: 5px 5px 0 0;">
        <div style="padding: 2px 16px;">
          <h4><b>Rishabh Anand</b></h4>
          <p>Head</p>
          <p>Lead Programmer</p>
          <p>Functional Programmer</p>
        </div>
      </div>
    </td>
    <td style="margin:10px; padding:10px;">
    <div style="box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); transition: 0.3s; border-radius: 5px;">
      <img src="https://avatars1.githubusercontent.com/u/38129975?v=4" alt="Avatar" style="width:200px; height:200px; border-radius: 5px 5px 0 0;">
        <div style="padding: 2px 16px;">
          <h4><b>Rajat Gupta</b></h4>
          <p>UI/UX Developer</p>
          <p>Functional Programmer</p>
        </div>
      </div>
    </td>
  </tr>
    <tr>
    <td style="margin:10px; padding:10px;">
      <div style="box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); transition: 0.3s; border-radius: 5px;">
        <img src="https://avatars1.githubusercontent.com/u/38110540?v=4" alt="Avatar" style="width:200px; height:200px; border-radius: 5px 5px 0 0;">
        <div style="padding: 2px 16px;">
          <h4><b>Ridhav Modi</b></h4>
          <p>Database controller Manager (MongoDB).</p>
          <p>Tester</p>
        </div>
      </div>
    </td>
    <td style="margin:10px; padding:10px;">
    <div style="box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); transition: 0.3s; border-radius: 5px;">
      <img src="https://avatars1.githubusercontent.com/u/42670831?v=4" alt="Avatar" style="width:200px; height:200px; border-radius: 5px 5px 0 0;">
        <div style="padding: 2px 16px;">
          <h4><b>Rishav Garg</b></h4>
          <p>Documentations</p>
          <p>Deployment Head</p>
        </div>
      </div>
    </td>
  </tr>
</table>
    
