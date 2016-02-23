# My First REST API Exercise

REST API Template Basic app codebase. This was developed as an exercise assignment for MarketLytics.

## Introduction

This is a demo REST API for an issue tracking application. This document will help you get a better sense of what is required as the solution.

This is backend for Node and Express using the Mongoose library for data management. The API adhers to REST [GET, POST, PUT and DELETE] protocols and return all data in JSON format. 
The authentication of the user done via an API key, (all routes needs authentication except for POST /users). The API key is sent in the header of every request and validate before the expected function is triggered. 
For calls like DELETE Issue, its related comments also get deleted (transactions are cascading).

I've used TDD (Test driven development) approach for testing, means before writing the routes, i 've written their tests and then implemented them. 
all possible routes validations is handled. 

## Models
There are the following models in the application (right now):

**User**
- Properties:
id, username, password, created, updated

**Project**
- Properties:
id, title, owner:User, created, updated, users: List(User)

**Issue**
- Properties:
id, title, description, project: Project, assignee: User, created, updated, creator: User, state

**Comment**
- Properties:
id, content, commentedOn: Issue, postedBy: User, created, updated

## Setup

This project uses Yeomen.io `[generator-angular-fullstack](https://github.com/DaftMonk/generator-angular-fullstack)` codebase.

Along with, used `Mongoose` with `MongoDB` as the library to manage models and persistent data. 

Just ignore the frontend (angular) for this project (for now) and only worked on the server folder.


**Do you want to start your api exercise from scratch?** 

If `yes`, then follow this setup otherwise clone this project and use:

You will setup your codebase using the following Yeomen.io generator:

https://github.com/DaftMonk/generator-angular-fullstack

You will need to install MongoDB on your machines using `brew install mongo`.

You will ignore the frontend (angular) for this project and only work on the server folder.

After running the `yo` command, please see below screenshot for the configuration of your project:

https://hackpad-attachments.imgix.net/hackpad.com_rQ0Au2RQFBU_p.423493_1441189703058_Screen%20Shot%202015-09-02%20at%2015.26.38.png?fit=max&w=882

Once the above is completed, you need to start `mongod` and then `grunt serve`

The tests for this are also already configured:
You can see them in the server/api/MODEL/model.spec file. These are your unit tests, you will add for your own models and extend the ones already there if needed.

That's all you need!

Cheers,

Narain Sagar.
