import axios from 'axios';
import { FormData } from 'formdata-node';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data = await req.json();
  const code: any = data.code;
  const redirectUri: any = data.redirectUri;
  console.log(code, redirectUri);
  // send form based request to Instagram API
  const form = new FormData();

  // Append your data
  form.set('client_id', '1393597341247005');
  form.set('client_secret', 'd21b9e67c4c5cd7e57378f8f90474475');
  form.set('grant_type', 'authorization_code');
  form.set('redirect_uri', redirectUri); // replace with your value
  form.set('code', code); // replace with your value

  // Make the request
  const {
    data: { user_id, access_token },
  } = await axios.post('https://api.instagram.com/oauth/access_token', form);
  try {
    const { data: insta_data } = await axios.get(
      `https://graph.instagram.com/${user_id}?fields=id,username&access_token=${access_token}`
    );
    return NextResponse.json({
      user_id,
      access_token,
      data: insta_data,
    });
  } catch (err) {
    return NextResponse.json(err);
  }
}
