import React from "react";
import { NavigateFunction, useLocation, useNavigate, useParams } from "react-router";

export interface RoutedProps<Params = any, State = any> {
    location: State;
    navigate: NavigateFunction;
    params: Params;
} 
export function withRouter( Child: React.ComponentClass ) {
    return ( props:any ) => {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();
        return <Child { ...props} navigate={ navigate } location={ location } params={ params }/>;
    }
}