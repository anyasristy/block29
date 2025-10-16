import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { deleteActivity } from "../api/activities";
export default function ActivityList({ activities =[], syncActivities }) {
  const { token} = useAuth();
  const [error,setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const handleDelete = async (id) => {
    setError(null);
    setDeletingId(id);
    try {await deleteActivity(token, id);
      if (typeof syncActivities === "function") {
        await syncActivities();}
    } catch(e){setError(e.message);
    } finally {setDeletingId(null);
    }
  };
  return (
    <>
      {error && <p role="alert">{error}</p>}
      <ul>
        {activities.map((activity) => (
          <li key={activity.id} style={{ display: "flex", gap: "3ch", alignItems: "center" }}>
            <span>
              <strong>{activity.name}</strong>
              {activity.description? `— ${activity.description}`:""}
            </span>
            {token &&(
              <button
                onClick={()=>handleDelete(activity.id)}
                disabled={deletingId===activity.id}
                aria-label={`Delete ${activity.name}`}>
                {deletingId===activity.id? "Deleting…": "Delete"}
              </button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

