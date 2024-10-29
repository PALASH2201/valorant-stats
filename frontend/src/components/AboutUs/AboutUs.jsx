import React, { useRef } from 'react';
import styles from './AboutUs.module.css';

const teamMembers = [
    {
        name: 'Palash Mahajan',
        role: 'Frontend Developer',
        skills: 'React | CSS | UI Design',
        projects: '1. E-commerce Website\n2. Personal Portfolio\n3. Blog Platform',
        education: 'B.Sc. in Computer Science, XYZ University',
        bio: 'Creating seamless user experiences with a passion for design and functionality. Palash transforms ideas into reality, making the web come alive.',
        image: 'https://via.placeholder.com/150', // Replace with actual image URLs
    },
    {
        name: 'Anushka Jadhav',
        role: 'Backend Developer',
        skills: 'Node.js | Express | Database Management',
        projects: '1. Task Management App\n2. RESTful API for E-commerce\n3. Blogging Platform',
        education: 'B.Tech in Information Technology, ABC Institute',
        bio: 'Master of server-side technologies, Anushka ensures smooth data flow, making complex processes feel simple and intuitive.',
        image: 'https://via.placeholder.com/150', // Replace with actual image URLs
    },
    {
        name: 'Krishna Sharma',
        role: 'UI/UX Designer',
        skills: 'Figma | Prototyping | User Research',
        projects: '1. Mobile App Design\n2. Website Redesign for Startup\n3. User Research for SaaS Product',
        education: 'M.A. in Design, DEF University',
        bio: 'Bringing creativity to life, Krishna focuses on enhancing user satisfaction by crafting intuitive designs that are both beautiful and functional.',
        image: 'https://via.placeholder.com/150', // Replace with actual image URLs
    },
    {
        name: 'Manan Kher',
        role: 'Project Manager',
        skills: 'Leadership | Agile | Communication',
        projects: '1. Team Coordination for Hackathon\n2. Agile Transformation in Projects\n3. Workshop on Project Management',
        education: 'B.E. in Computer Engineering, GHI College',
        bio: 'An orchestrator of teamwork, Manan skillfully coordinates projects, managing timelines and leading the team toward success with clarity and direction.',
        image: 'https://via.placeholder.com/150', // Replace with actual image URLs
    },
];

const AboutUs = () => {
    const memberRefs = useRef([]);

    const scrollToMember = (index) => {
        const offset = 80; // Adjust this value to change the scroll offset
        const element = memberRefs.current[index];
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    };

    return (
        <div className={styles.aboutUsContainer}>
            <section className={styles.heroSection}>
                <h1 className={styles.heading}>Meet the Team</h1>
                <div className={styles.teamGrid}>
                    {teamMembers.map((member, index) => (
                        <div
                            className={styles.teamMember}
                            key={index}
                            onClick={() => scrollToMember(index)} // Scroll to section on click
                        >
                            <img src={member.image} alt={member.name} className={styles.profileImage} />
                            <h2 className={styles.memberName}>{member.name}</h2>
                            <h3 className={styles.memberRole}>{member.role}</h3>
                        </div>
                    ))}
                </div>
            </section>
            
            {teamMembers.map((member, index) => (
                <div className={styles.memberDetail} key={index} ref={(el) => (memberRefs.current[index] = el)}>
                    <div className={styles.memberInfo}>
                        <div className={styles.memberSkills}>
                            <img src={member.image} alt={member.name} className={styles.detailImage} />
                            <div className={styles.skills}>
                                <h3>Skills:</h3>
                                <p>{member.skills}</p>
                            </div>
                        </div>
                        <div className={styles.memberBio}>
                            <h2 className={styles.memberName}>{member.name}</h2>
                            <h3 className={styles.memberRole}>{member.role}</h3>
                            <p className={styles.bioText}>{member.bio}</p>
                            <h4 className={styles.projectsHeading}>Projects:</h4>
                            <p className={styles.projectsText}>{member.projects}</p>
                            <h4 className={styles.educationHeading}>Education:</h4>
                            <p className={styles.educationText}>{member.education}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AboutUs;
