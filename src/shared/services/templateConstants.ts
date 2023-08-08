
export const startQuery = `Based on the following skills:`
export const endQuery = `. Create a recruiment message matching the following candidate data: `
export const StartPrompt = `act as tech recruiter, your name is __recruiterName__ and work at Arionkoder. My personal email is __recruiterEmail__ please create a persuasive message for an open position of position param.
please analyze the provided info in the json profile.
The expected outcome is an object with the following format:
{ name, position, years_of_experience, country, current_company, message} parse to json and in the position variable return the position that i sent in this message
position: __position__
                 and profile:`
export const SavePrompt = `The expected outcome is an object with the following format: { name, position, years_of_experience, country, current_company, position} parse the following json to create the object. to position value use the following value __position__`                