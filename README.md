## Setup

1. Have Node.js installed.
2. Run `npm install`.
3. Copy `.env.example` to `.env` from and fill in the values.

## Development

1. Run `npm run dev` and go to [http://localhost:5173](http://localhost:5173).

## Husky

This template uses Husky to run ESLint and Prettier on commit. If you want to skip this, use `git commit --no-verify`.

## Tests

We use Cypress for end-to-end and component testing. Currently you can execute the following scripts:

- `npm run cypress`: This command opens the Cypress Test Runner, allowing you to interactively run and debug tests.
- `npm run cy:run-e2e`: This command runs end-to-end tests in headless mode.
- `npm run cy:run-unit`: This command runs component tests in headless mode.

Make sure to review the [Cypress documentation](https://docs.cypress.io/) for more advanced usage and configuration options.

## Pull requests conventions

Our PR merging process follows a **squash and merge** policy. This means individual commit messages aren't as important as the pull request title and description. All individual commits are squashed into a single commit, defined by the PR details, and merged into the corresponding branches.

For a pull request to be merged, it must receive at least one approval from a team member. The team member assigned to the PR is usually responsible for merging it. However, if the assigned person delegates the merging task to someone else, the PR can be merged by that person.

### Pull request title

The title should be in the present tense, in lower case, and without a period at the end. We follow
[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for our commit messages, so the title should follow the same format. The title should be in the format:

```
<type>(<optional scope>): <description>
```

With type being one of the following:

- `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation
- `ci`: Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `feat`: A new feature
- `fix`: A bug fix
- `perf`: A code change that improves performance
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `revert`: Reverts a previous commit
