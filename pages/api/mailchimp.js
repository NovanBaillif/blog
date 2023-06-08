import mailchimp from '@mailchimp/mailchimp_marketing'

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER, // E.g. us1
})

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  try {
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: 'subscribed',
    })
    return res.status(201).json({ error: '' })
  } catch (error) {
    console.error(error) // Log the error for debugging
    if (error.status === 400 && error.title === 'Member Exists') {
      return res.status(400).json({ error: 'That email address is already a list member' })
    } else {
      return res.status(500).json({ error: error.message || error.toString() })
    }
  }
}
