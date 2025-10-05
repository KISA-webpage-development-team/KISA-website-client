# Git & GitHub

originally from: [Git & GitHub](https://jioh.mintlify.app/collaboration/git-github) by [@retz8](https://github.com/retz8)

## Branches

### main

`main` branch is for **PRODUCTION.** Pushing to the main branch leads to a deployment attempt. When the deployment process is completed in Vercel, the code on the main branch goes live at [umichkisa.com](http://umichkisa.com)

#### Summary

1. Push code or merge code to the `main` branch
2. Deployment process starts in Vercel
3. If successful, production updates

> #### ⚠️ Warning
>
> DON'T PUSH CODE DIRECTLY to the `main` branch during collaboration.
>
> Rather, send Pull Request and Merge to the `main` branch from other branch.
>
> Since our Git Repo is in free plan, there's no protection rule on the branch so anyone can push code to the `main` branch. But still, deployment is protected by Vercel. Only limited users can trigger deployment on Vercel.

### Project branch: \<project-name\>

For example, `pocha` branch is for 포차 주문앱 project. Whenever you start a new project, create a new project branch. You can think of this branch as a collection of all the project-specific code.

#### Create a new project branch

The initial project branch is mostly a copy of the `main` branch. Make sure your local `main` branch is up-to-date with the origin.

```bash
git checkout -b <project-name> main
```

#### Working on the project

While working on the project, the project branch is the "final" version of the project to be released. Sub-branches of the project are collected (by PR and merge) into the project branch. Here's an example

1. The developer starts working on the landing page UI task for the 포차 project
2. Creates a sub-branch called `pocha/landing-page-ui`
3. After finishing working on the sub-branch, make a PR to merge `pocha/landing-page-ui` to `pocha` branch
4. When PR is approved, `pocha` branch is updated with`pocha/landing-page-ui` .

#### Release the project to live

There are two scenarios when you want to merge a project branch into the `main` branch

1. New Project is ready to release
2. Update the existing project with improvements & new features

For both of the scenario,

\*\*Send PR from the project branch to the \*\*`main` **branch**

### Task Branch: \<project-name\>/\<task\>

The task branch is the primary branch you will work on as a member. To work on the project collaboratively, each tasks are assigned to different members. To avoid code conflicts, each task should be completed in its own task branch.

#### Create a new task branch

Mostly, your task is related to the specific project. Here are two examples.

1. If you are working on a task to add a new sponsor to the **Official Website**

   Create a branch `kisa-web/add-sponsor` based on the project branch. However, `kisa-web` doesn't have its specific project branch. So based on the `main` branch.

```bash
git checkout -b kisa-web/add-sponsor main
```

2. If you are working on a task to add a promotion UI to the **Pocha App**

   Create a branch `pocha/promotion-ui` based on the `pocha` project branch.

```bash
git checkout -b pocha/promotion-ui pocha
```

#### Working on the task

Most of the time, you are free to do anything within your task branch. But here is a scenario you may encounter.

> The project branch is updated with new code from other tasks (or developers). In other words, your task branch is **out of sync with the project branch**

In this case, you need to follow the steps below

1. Update your **local project branch** with the remote branch

```bash
git switch <project-name> # change to the project branch
git pull origin <project-name> # sync local project branch with remote branch
```

2. Switch back to your task branch and `rebase` **with the project branch**

```bash
git switch <project-name>/<task> # switch back to the task branch
git rebase <project-name> # sync task branch with project branch
```

> #### ℹ️ Info
>
> You might notice that you need to rebase, not merge. This is because rebase make PR clearer when you are making PR from task branch to the project branch. When you just merge it, all the new commits from the project branch will appear on the PR. This will make reviewers difficult to review. When you rebase it, these new commit messages will be not included in the PR. Only the commits you made for the task will remain.

#### When you are done with the task

Please follow the steps below.

1. add and commit

```bash
git add .
git commit -m "<commit-message>"
```

> #### ⚠️ IMPORTANT
>
> Highly recommended to keep **one commit message per one PR**
>
> This will make a code review much easier. Checking multiple commit messages with scatter code updates is hard.

2. push to the task branch

```bash
git push -u origin <project-name>/<task>
```

3. Then go to the GitHub website, and make a Pull Request

`<project-name>/<task>` -\> `<project>`

4. Request a review, and once it's approved, confirm the merge

#### When you need to update task branch after PR

In other words, when your PR is not approved, you need to update something.

1. add and commit, but without changing the commit message

```bash
git add .
git commit --amend --no-edit
```

2. push, but force push

```bash
git push -f origin <project-name>/<task>
```

3. After pushing an updated code to your task branch, you may need to **request a review again at the same PR**. Once it's approved, your task is done.
