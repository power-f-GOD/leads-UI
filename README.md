# Leads UI

UI for Leads (API) built with [Next.js 14](https://nextjs.org/).

## Installation

1. Clone the repository and navigate into it:

```zsh
git clone https://github.com/power-f-GOD/leads-UI.git && cd lead-ui
```

2. Install dependencies:

```zsh
npm i -g pnpm && pnpm i
```

3. Create a `.env.local` file in the root directory of the project with the required environment variables. (See the [Environment Variables](#environment-variables) section)

`Hint`: Copy the contents of `.env.example`.

## Environment Variables

The following environment variables must be set in a `.env.local` file:

- `NEXT_PUBLIC_API_HOST`: The hostname or IP address that the API server is listening on
- `NEXT_PUBLIC_API_PORT` (optional): The port that the API server is running
- `NEXT_PUBLIC_MODE`: The mode in which the app is running: `'development'` | `'production'`
- `API_KEY`: Your API key (as provided)

## Usage

1. Start the development server:

```zsh
pm dev
```

`Sidebar:` You can set an alias for `pnpm` in your `.zshrc` (on Mac) or `.bashrc` file by including this line `alias pm=pnpm` therein.

2. Navigate to [http://localhost:3000](http://localhost:3000) in your browser to see the app running.

## Tests \[No tests implemented/written yet\]

The project uses [Jest](https://jestjs.io/) as the test runner/framework.

To run the tests, simply run the following command:

```zsh
pm test
```

See `package.json` for the rest test scripts.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
