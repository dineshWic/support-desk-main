import { Link } from 'react-router-dom'
import { FaTicketAlt, FaUpload } from 'react-icons/fa'
import { useSelector } from 'react-redux'

function Home() {
  const { user } = useSelector((state) => state.auth)

  return (
    <>
      <section className='heading'>
        <h1>Check Your Marks</h1>
        <p>Choose an option below</p>
      </section>

      {user && user.userType === 'teacher'? 
        <Link to='/new-ticket' className='btn btn-reverse btn-block'>
          <FaUpload /> Upload Files
        </Link>
        :
        !user &&
        <Link to='/new-ticket' className='btn btn-reverse btn-block'>
          <FaUpload /> Upload Files
        </Link>     
    
    }


      <Link to='/tickets' className='btn btn-block'>
        <FaTicketAlt />View Documents 
      </Link>
    </>
  )
}

export default Home
