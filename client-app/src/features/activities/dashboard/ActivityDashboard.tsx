import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
    activities: Activity[],
    selectedActivity: Activity | undefined,
    cancelActivity: () => void,
    selectActivity: (id: string) => void,
    editMode: boolean,
    openForm: (id : string) => void,
    closeForm: () => void,
    saveActivity: (activity: Activity) => void,
    deleteActivity: (id: string)=> void,
    submitting: boolean
}

export default function ActivityDashboard({ activities, selectedActivity, cancelActivity,
     selectActivity, editMode, openForm, closeForm, saveActivity, deleteActivity, submitting }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities}
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}
                    submitting={submitting}
                    />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                    <ActivityDetails 
                        activity={selectedActivity} 
                        cancelActivity={cancelActivity}
                        openForm = {openForm} />}
                {editMode &&
                <ActivityForm 
                    closeForm = {closeForm} 
                    activity = {selectedActivity} 
                    saveActivity={saveActivity} 
                    submitting = {submitting}
                />}
            </Grid.Column>
        </Grid>
    );
}