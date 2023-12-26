import {LoginForm} from '@/components/login-form';

export default function Login() {
  return (
    <>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <a className="sm:mx-auto sm:w-full sm:max-w-sm" href="/">

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
            Sign in to your account
          </h2>
        </a>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

          <LoginForm></LoginForm>

        </div>
      </div>
    </>
  )
}
