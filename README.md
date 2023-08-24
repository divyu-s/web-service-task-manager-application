# web-service-task-manager-application

This is backend for simple task manager application created using Node.js, Express.js, and NPM packages. The projects API will allow users to perform CRUD operations (Create, Read, Update, and Delete) on tasks. The tasks will have a title, description, and a flag for completion status

## Author

- [@divyanshu](https://github.com/divyu-s)

## How to run

Clone the project

```bash
  git clone https://github.com/divyu-s/web-service-task-manager-application.git
```

Go to the project directory

```bash
  cd web-service-task-manager-application
```

Install dependencies

```bash
  npm install
```

Start the server for development mode

```bash
  npm start
```

It will start a server for development use with url http://localhost:3000/.

## API Reference

##### Retrieve all tasks

```http
   GET /tasks
```

##### Retrieve a single task by its ID

```http
   GET /tasks/:id
```

##### Create a new task

```http
  POST /tasks
```

| Body          | Type      | Description                       |
| :------------ | :-------- | :-------------------------------- |
| `title`       | `string`  | **Required**. title of task       |
| `description` | `string`  | **Required**. description of task |
| `completed`   | `boolean` | **Required**. status of task      |

##### Update an existing task by its ID

```http
  PUT /tasks/:id:
```

| Body          | Type      | Description         |
| :------------ | :-------- | :------------------ |
| `title`       | `string`  | title of task       |
| `description` | `string`  | description of task |
| `completed`   | `boolean` | status of task      |

##### Delete a task by its ID

```http
  POST /tasks/:id:
```
