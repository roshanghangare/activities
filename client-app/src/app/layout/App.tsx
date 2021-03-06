 import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then(response => {
      let activities : Activity[] = [];
      response.forEach(activity => {
        activities.push({...activity, date: activity.date.split('T')[0]})
      });
      setActivities(activities);
      setLoading(false);
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
    setSubmitting(true);
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(a => a.id !== id)]);
      setSubmitting(false);
    });
  }

  function handleSaveActivity(activity: Activity) {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(a => a.id !== activity.id), activity])
        setEditMode(false);
        setSubmitting(false);
      });
    }
    else{
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities(activities)
        setEditMode(false);
        setSubmitting(false);
      });
    }
  }

  if(loading) return <LoadingComponent content='Loading app'/>

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
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
