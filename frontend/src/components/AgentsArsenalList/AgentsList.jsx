import React from 'react';
import styles from "./AgentsArsenalList.module.css";
import {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';

const AgentsList = () => {
    const [agents, setAgents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/agents');
                const data = await response.json();
                setAgents(data.agents);
            } catch (error) {
                console.error('Error fetching agents:', error);
            }
        };

        fetchAgents();
    }, []);

    const handleAgentClick = (agentName) => {
        navigate(`/agents/${agentName.toLowerCase()}`);
    };

    return (
        <div className={styles.agentsListContainer}>
            <div className={styles.scrollContainer}>
                {agents.map((agent) => (
                    <div 
                        key={agent.displayName} 
                        className={styles.agentCard} 
                        onClick={() => handleAgentClick(agent.displayName)}
                    >
                        <img 
                            src={agent.displayIcon} 
                            alt={agent.displayName} 
                            className={styles.agentImage} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );

};

export default AgentsList