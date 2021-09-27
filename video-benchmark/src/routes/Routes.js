import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../menus/Home";
import MakePresentationMenu from "../menus/MakePresentationMenu";
import PresenterMenu from "../menus/PresenterMenu";
import JoinPresentationMenu from "../menus/JoinPresentationMenu";
import AudienceMenu from "../menus/AudienceMenu";
import VideoSelectionForm from "../forms/VideoSelectionForm";

function Routes() {

  return (
      <div className="Routes">
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/presenter">
                <JoinPresentationMenu myUser={"presenter"}/>
            </Route>
            <Route exact path="/presenter/create">
                <MakePresentationMenu />
            </Route>
            <Route exact path="/presenter/:presID">
                <PresenterMenu />
            </Route>
            <Route exact path="/audience">
                <JoinPresentationMenu myUser={"audience"}/>
            </Route>
            <Route exact path="/audience/:presID">
                <AudienceMenu />
            </Route>
            <Route exact path="/audience/past">
                <VideoSelectionForm />
            </Route>




            <Redirect to="/" />
        </Switch>
      </div>
  );
}

export default Routes;