const API = import.meta.env.VITE_API;

/** Fetches an array of activities from the API. */
export async function getActivities() {
  try {
    const response = await fetch(API + "/activities");
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

/**
 * Sends a new activity to the API to be created.
 * A valid token is required.
 */
export async function createActivity(token, activity) {
  if (!token) {
    throw Error("You must be signed in to create an activity.");
  }

  const response = await fetch(API + "/activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(activity),
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}
export async function deleteActivity(token, activityId) {
  if (!token) {
    throw Error("You must be signed in to delete an activity.");
  }
  const response = await fetch(`${API}/activities/${activityId}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
    let result;
    try {
      result = await response.json();
    } catch {
      throw Error("Error: No deletion.");
    }
    throw Error(result.message || "Did not delete");
  }
  return;
}
