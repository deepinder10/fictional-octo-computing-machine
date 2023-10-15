import { useCallback } from "react";
import { useUser } from '@providers';
import Card from "src/components/Card";
import Loader from "src/components/Loader";
import { UserContextValue } from "@types";
import ErrorText from "src/components/ErrorText";

/* TODO:
1. Center Card component within the #home.
2. Display user's full name and their email. Use UserProvider's functionality (see providers.js)
3. Display user's masked phone number, and implement a way to unmask it. Use UserProvider's context.
*/

const Home: React.FC = () => {
  const { user, toggleMask, isMasked, isLoading, error }:UserContextValue = useUser();

  /**
   * Handles the click event on the "Unmask Phone Number" button.
   * Toggles the phone number mask and updates the isUnmasked state.
  */
  const handleMaskClick = useCallback(() => {
    toggleMask();
  }, [toggleMask]);

  if (error) {
    return <ErrorText message={error} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return <ErrorText message="User not found" />;
  }

  return (
    <div id="home" className="flex justify-center items-center h-screen w-screen">
      <Card user={user} isMasked={isMasked} toggleMask={handleMaskClick} />
    </div>
  );
}

export default Home;
