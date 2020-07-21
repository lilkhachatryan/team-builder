import React from "react";
import { BrowserRouter as ReactRouter, Switch } from "react-router-dom";
import Route from "./components/Route";
import { Home, Login, SignUp, Topics, Profile, Projects } from "./pages";

export const Routes = Object.freeze({
    Root: process.env.PUBLIC_URL + '/',
    Home: '/home',
    Profile: '/profile',
    Projects: '/projects',
    Topics: '/topics',
    Login: '/login',
    SignUp: '/sign-up',
    NotFoundPage: '*'
});

const NotFound = ({ location }) => (
    <div>
        <strong>Error!</strong> No route found matching:
        <div>
            <code>{location.pathname}</code>
        </div>
    </div>
);

function Router() {
    return (
        <ReactRouter>
            <Switch>
                <Route path={Routes.Login} component={Login} />
                <Route path={Routes.SignUp} component={SignUp} />
                <Route guard path={Routes.Home} component={Home} />
                <Route guard path={Routes.Topics} component={Topics} />
                <Route guard path={Routes.Profile} component={Profile} />
                <Route guard path={Routes.Projects} component={Projects} />

                <Route exact guard path={Routes.Root} component={Home} />

                <Route path={Routes.NotFoundPage} component={NotFound}/>
            </Switch>
        </ReactRouter>
    );
}

export default Router;
