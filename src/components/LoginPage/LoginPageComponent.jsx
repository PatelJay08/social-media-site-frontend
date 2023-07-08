import { Grid } from "@mui/material";
import SingInComponent from "./SignInComponent";
import './LoginPage.css'
import SignUpComponent from "./SingUpComponent";

export default function LoginPageComponent() {

    return (
        <div>
            <Grid container>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <div className="loginpage__main_">
                        <div className="loginpage_rightcomponent">
                            <div className="loginPage__signin">
                                <SingInComponent />
                            </div>
                        </div>
                        {/* <SignUpComponent /> */}
                    </div>
                </Grid>
                <Grid item xs={3}></Grid>
            </Grid>
        </div>
    )
}