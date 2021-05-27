import { useContext } from 'react'
import { AuthContext } from '../auth'
import ListingPage from './ListingPage'

const Dashboard = () => {
    const { currentUser } = useContext(AuthContext)

    return (
        <>
            {!!currentUser ? (
                <div>
                    <ListingPage user={currentUser.displayName} />
                </div>
            ) : (
                <div>
                    <ListingPage user="Guest" />
                </div>
            )}
        </>
    )
}

export default Dashboard