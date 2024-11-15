const form = document.getElementById('myForm');
const webhook = document.getElementById('webhookUrl')
form.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);


    const embed = {
        title: data['title'],
        description: data['desc'], 
        color: 0x00ff00 
    };

    const code = [`
        const embed = {
        title: ${data['title']},
        description: ${data['desc']}, 
        color: 0x00ff00 
    };
        `]

    const codebed = {
        title: 'Here is the code for the embed',
        description: `\`\`\`\n${code}\n\`\`\``
    }


    const payload = {
        embeds: [embed, codebed]
    };

    try {

        const response = await fetch(data['webhookLINK'], {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(payload) 
        });


        if (response.ok) {
            console.log('Message sent successfully');
        } else {
            console.error('Failed to send message', response.status, await response.text());
        }
    } catch (error) {
        console.error('Error sending message', error);
    }


    form.reset();
});