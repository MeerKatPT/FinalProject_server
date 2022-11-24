# Name To Be Decided - Jobnder

<br>

# Quick Compo

<br>

## Description

Jobnder is a platform were developers and companies can find the perfect match depending on their skills.

## User Stories

- **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.
- **Signup:** As an anonymous user I can sign up on the platform. There are two options "developer" or "company". Developers can create a profile and add description, skills, etc. Companies can also add their info and find their match
- **Login:** As a Developer user I can login to the platform so that I can access my profile and start adding skills and swipe through different jobs.
- **Logout:** As a logged in user I can logout from the platform so no one else can use it.
- **Profile Page**: As a logged in user I can visit my profile page so that I can access the edit page and see my skills and jobs that I have saved and/or applied.
- **Jobs Page**: As a logged in user I can see the available jobs that match my skills (let's say at least 2/3 skills)
- **Company Page**: ?????????????????????????????????
- **Jobs add**: Company can add jobs manually?

NOT SURE ABOUT THIS

- **My Jobs:** As a logged in user I can access MyJobs page so that I can check jobs and remove them if I want. WHAT ELSE?

## Backlog

- Add weather widget
- lottie interactions
- users can bet
- add geolocation to events when creating

<br>

# Client / Frontend

## React Router Routes (React App)

| Path            | Component       | Permissions                | Behavior                                          |
| --------------- | --------------- | -------------------------- | ------------------------------------------------- |
| `/login`        | LoginPage       | anon only `<AnonRoute>`    | Login form, navigates to home page after login.   |
| `/signup`       | SignupPage      | anon only `<AnonRoute>`    | Signup form, navigates to home page after signup. |
| `/`             | HomePage        | public `<Route>`           | Home page.                                        |
| `/profile`      | ProfilePage     | user only `<PrivateRoute>` | User/developer profile for the current user.      |
| `/profile/edit` | EditProfilePage | user only `<PrivateRoute>` | Edit user profile                                 |

| `/jobs/add` | CreateJobPage | user and company only `<PrivateRoute>` | Create new job form. |
| `/jobs` | JobsListPage | user only `<PrivateRoute>` | Jobs created and jobs from API |
| `/jobs/:jobId` | JobDetailsPage | user only `<PrivateRoute>` | Job details. Shows the description of the jobitself with the different elements from the API |

/rota para messages

## Components

Pages:

- LoginPage

- SignupPage

- HomePage

- ProfilePage (Developer)

- EditProfilePage (Developer)

- ProfilePage (Company)

- EditProfilePage (Company)

- CreateJobPage

- JobListPage

- JobDetailsPage

- Tinder Swipe Page

Components:

- UserCard
- CompanyCard
- DeckForSwipe
- Navbar
- Footer
-

## Services

- **Auth Service**

  - `authService` :
    - `.login(user)`
    - `.signup(user)`
    - `.logout()`
    - `.validate()`

- **User Service**

  - `userService` :
    - `.updateCurrentUser(id, userData)`
    - `.getCurrentUser()`

- **Company Service**

  - `companyService` :
    - `.updateCurrentCompany(id, companyData)`
    - `.getCurrentCompany()`

- **Job Service**

  - `jobService` :
    - `.addJob(jobData)`
    - `.getjobs()`
    - `.getOneJob(id)`
    - `.deleteJob(id)`

<br>

# Server / Backend

## Models

**User model**

```javascript
{
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountType: {type: String, enum:["developer", "company"]}
  createdJobs: [ { type: Schema.Types.ObjectId, ref:'Jobs' } ],
  firstName: { type: String, },
  lastName: { type: String, },
  profileImage: { type: String },
  location: { type: String, },
  education: { type: String, },
  experience: { type: Number, }, 
  description: { type: String, },
  skills: {type: String, enum: ["React", "Python", "JavaScript", "AWS", "Java", "TypeScript", "Docker", "Kubernets", "SQL", "C++", "CSS", "C#", "Git", "NodeJS", "Ruby", "MySQL", "HTML", "Redis", "Azure", "MongoDB", "ExpressJS"]},
  roles: {type: String, enum: ["Backend Developer", "DevOps & Infrastructure", "Frontend Developer", "Fullstack Developer", "Game Engineer"]}
}
```

**Jobs model**

```javascript
 {
   name: { type: String, required: true },
   title: { type: String, required: true},
   description: { type: String, required: true },
   creator: [ { type: Schema.Types.ObjectId, ref:'user' } ]
   applicant: [ { type: Schema.Types.ObjectId, ref:'user' } ], // not sure about this. Make one just for user and join with Dev e Company?
 }
```

**contact/message between users model**

```javascript
{
  content: { type: String, required: true },
  sender: [ { type: Schema.Types.ObjectId, ref:'user' } ],
  receiver: [ { type: Schema.Types.ObjectId, ref:'user' } ]
}
```

<br>

## API Endpoints (backend routes)

| HTTP Method | URL              | Request Body            | Success status | Error Status | Description                                                                                                                     |
| ----------- | ---------------- | ----------------------- | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| GET         | `/auth/profile ` | Saved session           | 200            | 404          | Check if user is logged in and return profile page                                                                              |
| POST        | `/auth/signup`   | {name, email, password} | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`    | {username, password}    | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session              |
| POST        | `/auth/logout`   |                         | 204            | 400          | Logs out the user                                                                                                               |

| EDIT PROFILE

| GET | `/api/jobs` | | | 400 | Show all jobs |
| GET | `/api/jobs/:id` | | | | Show specific job |
| POST | `/api/jobs` | { name, title, description, etc } | 201 | 400 | Create and save a new job |
| PUT | `/api/jobs/:id` | { name, title, description, etc } | 200 | 400 | edit job |
| DELETE | `/api/jobs/:id` | | 201 | 400 | delete job |

<br>

## API's

<br>

## Packages

<br>

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/tJ4GBtPp/final-project)

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/MeerKatPT/FinalProject_client)

[Server repository Link](https://github.com/MeerKatPT/FinalProject_server)

[Deployed App Link](http://heroku.com)

### Slides

[Slides Link](http://slides.com) - The url to your _public_ presentation slides

### Contributors

Filipe Guedes - <github-[MeerKat](https://github.com/MeerKatPT)> - <linkedin-profile-link>
