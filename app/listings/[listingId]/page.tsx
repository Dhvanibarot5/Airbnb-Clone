import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";

import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";

interface IParams {
  listingId: string;
}

export default async function ListingPage({ 
  params 
}: { 
  params: IParams 
}) {
  try {
    const { listingId } = params;
    
    const listing = await getListingById(listingId);
    const reservations = await getReservations({ listingId });
    const currentUser = await getCurrentUser();

    if (!listing) {
      return (
        <ClientOnly>
          <EmptyState />
        </ClientOnly>
      );
    }

    return (
      <ClientOnly>
        <ListingClient
          listing={listing}
          currentUser={currentUser}
          reservations={reservations}
        />
      </ClientOnly>
    );
  } catch (error) {
    console.error('Error in ListingPage:', error);
    return (
      <ClientOnly>
        <EmptyState 
          title="Something went wrong"
          subtitle="Please try again later"
        />
      </ClientOnly>
    );
  }
} 