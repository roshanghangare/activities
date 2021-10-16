import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from './models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data);
    })
  }, [])

  function handelSelectActivity(id: string) {
    setSelectedActivity(activities.find(a => a.id === id));
  }

  function handelCancelActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string): void {
    id ? handelSelectActivity(id) : handelCancelActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter(a => a.id !== id)]);
  }

  function handleSaveActivity(activity: Activity) {
    activity.id ?
      setActivities([...activities.filter(a => a.id !== activity.id), activity]) :
      setActivities([...activities, { ...activity, id: uuid() }])
  }

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em ' }}>
        <ActivityDashboard activities={activities}
          selectedActivity={selectedActivity}
          cancelActivity={handelCancelActivity}
          selectActivity={handelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          saveActivity={handleSaveActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;