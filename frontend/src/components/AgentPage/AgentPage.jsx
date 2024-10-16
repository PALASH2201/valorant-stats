import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from "./AgentPage.module.css";
import Loading from '../LoadingSpinner/Loading';

const AgentPage = () => {
    const { name } = useParams(); // Extract the agent name from the URL
    const [agent, setAgent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch agent details based on name
        const fetchAgent = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await fetch(`http://127.0.0.1:5000/agents/${name}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Agent not found');
                }
                const data = await response.json();
                setAgent(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAgent();
    }, [name]);

    if (loading) return <div><Loading/></div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={styles.agentPageContainer}>
            <div className={styles.infoSection}>
                <h1 className={styles.agentName}>{agent.displayName}</h1>
                <p className={styles.agentDescription}>{agent.description}</p>
                {agent.is_role && (
                    <div className={styles.roleSection}>
                        <h3>Role: {agent.role}</h3>
                        <img src={agent.role_icon} alt={`${agent.role} icon`} className={styles.roleIcon} />
                    </div>
                )}
                <h3>Abilities:</h3>
                <ul className={styles.abilitiesList}>
                    {agent.abilities.map((ability, index) => (
                        <li key={index} className={styles.abilityItem}>
                            <img src={ability.displayIcon} alt={ability.displayName} className={styles.abilityIcon} />
                            <div className={styles.abilityInfo}>
                                <strong className={styles.abilityName}>{ability.displayName}</strong>
                                <p className={styles.abilityDescription}>{ability.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.imageSection}>
                <img src={agent.fullPortrait} alt={agent.displayName} className={styles.agentPortrait} />
            </div>
        </div>
    );
};

export default AgentPage;
