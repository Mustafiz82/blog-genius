export default function DataDeletion() {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Data Deletion Instructions</h1>
        <p className="text-gray-600">
          If you want to request the deletion of your data associated with BlogGeniusAI, follow the steps below.
        </p>
  
        <section>
          <h2 className="text-xl font-semibold text-gray-700">1. Manual Deletion Request</h2>
          <p className="text-gray-600">
            Send an email to 
            <span className="font-medium text-blue-600"> support@bloggeniusai.com </span>  
            with the subject "Data Deletion Request." Include your registered email address.
          </p>
        </section>
  
        <section>
          <h2 className="text-xl font-semibold text-gray-700">2. Automatic Deletion (Facebook Users)</h2>
          <p className="text-gray-600">
            If you signed up using Facebook, you can remove your data by going to your  
            <a href="https://www.facebook.com/settings?tab=applications" className="text-blue-600 font-medium">
              Facebook App Settings
            </a>  
            and removing BlogGeniusAI.
          </p>
        </section>
      </div>
    );
  }
  