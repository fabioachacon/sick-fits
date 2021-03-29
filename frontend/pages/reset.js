import RequestReset from "../components/RequestReset";
import Reset from "../components/Reset";

const ResetPage = ({ query }) => {
    if (!query?.token) {
        return (
         <div>
            <p>You must supply a token</p>
            <RequestReset />
         </div>
        )
    }
    return (
        <div>
          <p>Reset your Password</p>
          <Reset token={query.token} />
        </div>
    )
}

export default ResetPage;
