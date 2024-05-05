const ErrorPage = () => {
  return (
    <>
      <h1 className="text-3xl text-center mt-10">404 Error: Page not Found</h1>
      <a href="/">
        <p className="underline text-blue-600 text-3xl text-center mt-10">
          Go back to main page
        </p>
      </a>
    </>
  );
};
export default ErrorPage;
