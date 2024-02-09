import React, {useContext, useEffect} from 'react'
import noteContext from '../context/notes/noteContext'

const About = () => {
  return (
    <div>
      <p>Netbook is a user-friendly note-taking web application that provides a seamless experience for users to organize and manage their notes.</p>
        <ul>
          <li>Utilized Technology Stack: ReactJS, Express, Node.js, MongoDB </li>
          <li>Developed a highly secure sign-up and login system, utilizing Bcryptjs encryption;</li>
          <li>effectively safeguarded user data against unauthorized access, enhancing overall user privacy.</li>
          <li>Implemented the 4 CRUD Create, Read, Update, Delete functionalities, enabling users to seamlessly add, update, and delete the notes.</li>
        </ul>
      <p>This Project is built by Mitesh Sharma, a computer science undergrad at VIT Bhopal. The website uses ReactJs, Bootstrap, Express, Nodejs, MongoDB. It is a simple and minimalistic project and will be update with new features in the future.</p>
      <p>Thank you for Using Netbook.</p>
    </div>
  )
}

export default About