import React from "react";
import styles from "./AgentsArsenalList.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

const AgentsList = () => {
  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/agents");
        const data = await response.json();
        setAgents(data.agents);
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchAgents();
  }, []);

  const handleAgentClick = (agentName) => {
    navigate(`/agents/${agentName.toLowerCase()}`);
  };

  // Split agents into chunks of a given size
  const chunkAgents = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  const agentChunks = chunkAgents(agents, 5); // Adjust the chunk size as needed

  return (
    <div className={styles.agentsListContainer}>
    <p style={{fontFamily:'Tungsten' , fontSize:'100px' , color:'white' , marginBottom:'0px' ,marginLeft:'30px'}}>AGENTS</p>
      <Carousel fade style={{ margin: "0px 0px" }} indicators={true} interval={null}>
        {agentChunks.map((chunk, index) => (
          <Carousel.Item key={index} >
            <div className={styles.scrollContainer}>
              {chunk.map((agent) => (
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
                  <p>{agent.displayName}</p>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default AgentsList;
