import { permissionsList } from "./schemas/fields";
import { ListAccessArgs } from "./types";

export const isSignedIn = ({ session }: ListAccessArgs) => {
    return !!session;
}

const generatePermissions = Object.fromEntries(permissionsList.map(permission => [
    permission,
    ({ session }: ListAccessArgs) => {
        return !!session?.data.role?.[permission]
    } 
]));

// Permission check if someone meets a criteria - yes or no.
export const permissions = {
   ...generatePermissions,
};

// Rule based function
// Rules can return a boolean - yes or no - or a filter which limits
// whicg products they can access CRUD.

export const rules =  {
    canManageProducts({ session }: ListAccessArgs  ) {
        if (!isSignedIn({ session })) {
            return false;
        }

        // 1. Do they have the permission of canManageProducts
        if (permissions.canManageProducts({ session })) {
            return true
        }

        // 2. If not, do they onw this item.
        return { user: { id: session.itemId } }
    },

    canOrder({ session }: ListAccessArgs  ) {
        if (!isSignedIn({ session })) {
            return false;
        }
        // 1. Do they have the permission of canManageProducts
        if (permissions.canManageCart({ session })) {
            return true;
        }

        // 2. If not, do they onw this item.
        return { user: { id: session.itemId } }
    },

    canManageOrderItems({ session }: ListAccessArgs  ) {
        if (!isSignedIn({ session })) {
            return false;
        }

        // 1. Do they have the permission of canManageProducts
        if (permissions.canManageCart({ session })) {
            return true
        }

        // 2. If not, do they onw this item.
        return { order: { user: session.itemId } }
    },

    canReadProducts({ session }: ListAccessArgs) {
        if (!isSignedIn({ session })) {
            return false;
        }

        if(permissions.canManageProducts({ session })) {
            return true;
        }

        return { status: 'AVAILABLE' }
    },

    canManageUsers({ session }: ListAccessArgs  ) {
        if (!isSignedIn({ session })) {
            return false;
        }
        // 1. Do they have the permission of canManageUsers
        if (permissions.canManageUsers({ session })) {
            return true;
        }

        // 2. Otherwise they may only update themselves
        return { id: session.itemId }
    },


}