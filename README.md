# Beta React Tutorial Project
This project uses React with Typescript + Vite.
This project also uses [pnpm](https://pnpm.io/) as the package manager. 

This project is developed based on the Tic-Tac-Toe tutorial on [Beta ReactJS docs](https://react.dev/learn/tutorial-tic-tac-toe) with major modifications. 

Notable modifications include addition of configuration menu to select board size, `PVP` and `PVE` mode, and its corresponding `PVE` options. 

## Getting Started

In the project directory, you can run:

### `pnpm run dev`

Runs the app in the development mode.\
Open [http://localhost:3030](http://localhost:3030) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `pnpm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [production build](https://vitejs.dev/guide/build.html) and [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `pnpm run preview`

Runs a preview of the production build from the `dist` folder. 
Note that you will have to run `npm run build` before running this. 
Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

For more detailed information about the preview options, please read the documentation about [Vite preview options](https://vitejs.dev/config/preview-options.html#preview-options).



## Deployment notes
Currently, there are 3 avenues of deployment. 
1. [Vercel](https://vercel.com/) --> A platform for frontend developers, which enable teams to iterate quickly and develop, preview, and ship with zero configuration. 
2. [Github pages](https://pages.github.com/). This is done using integration on the Github actions as recommended on the [official documentation from Vite](https://vitejs.dev/guide/static-deploy.html#github-pages). This uses `build-gh-page` npm script to build the project on the proper base URL (`{BASE_DOMAIN}/BetaReactTutorial`), which will use the custom `vite.config.gh-page.ts`. 
3. Manual deployment. This uses  `build-subdir` npm script to build the project on base URL of  (`{BASE_DOMAIN}/tic_tac_toe`) for prettier custom sub-URL. 
