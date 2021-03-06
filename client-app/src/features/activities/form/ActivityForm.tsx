import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

export interface Props{
    closeForm: () => void,
    activity: Activity | undefined,
    saveActivity: (activity: Activity) => void,
    submitting: boolean
}

export default function ActivityForm({closeForm, activity:selectedActivity, saveActivity, submitting}: Props) {
    const initialState = selectedActivity?? 
        {
            id:'',
            title:'',
            category:'',
            city:'',
            date:'',
            description:'',
            venue: ''        
        }
    const [activity, setActivity] = useState(initialState);

    function handleSubmit() {
        saveActivity(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value })
    }

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete ='off'>
                <Form.Input onChange={handleInputChange} placeholder='Title' value={activity?.title} name ='title'/>
                <Form.TextArea onChange={handleInputChange} placeholder='Description' value={activity?.description} name ='description'/>
                <Form.Input onChange={handleInputChange}  placeholder='Category'  value={activity?.category} name ='category'/>
                <Form.Input type='date' onChange={handleInputChange}  placeholder='Date'  value={activity?.date} name ='date'/>
                <Form.Input onChange={handleInputChange}  placeholder='City'  value={activity?.city} name ='city'/>
                <Form.Input onChange={handleInputChange}  placeholder='Venue'  value={activity?.venue} name ='venue'/>
                <Button loading={submitting} floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    );
}