// schemas/documents/vehicleDetails.ts
import { defineType, defineField } from 'sanity';
import { MdDirectionsCar } from 'react-icons/md';

export const vehicleDetails = defineType({
  name: 'vehicleDetails',
  title: 'Vehicle Details',
  type: 'document',
  icon: MdDirectionsCar,
  fields: [

    // 🔹 Core info
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 100 },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 6,
    }),

    // 🔹 Basic vehicle info
    defineField({ name: 'make', title: 'Make', type: 'string' }),
    defineField({ name: 'model', title: 'Model', type: 'string' }),
    defineField({ name: 'variant', title: 'Variant', type: 'string' }),
    defineField({ name: 'year', title: 'Year', type: 'number' }),
    defineField({ name: 'mileage', title: 'Mileage (KM)', type: 'number' }),
    defineField({ name: 'price', title: 'Price (ZAR)', type: 'number' }),
    defineField({ name: 'bodyType', title: 'Body Type', type: 'string' }),
    defineField({ name: 'fuelType', title: 'Fuel Type', type: 'string' }),
    defineField({ name: 'transmission', title: 'Transmission', type: 'string' }),
    defineField({ name: 'driveType', title: 'Drive Type', type: 'string' }),
    defineField({ name: 'engineSize', title: 'Engine Size (L)', type: 'number' }),
    defineField({ name: 'power', title: 'Power (kW)', type: 'number' }),
    defineField({ name: 'colour', title: 'Exterior Colour', type: 'string' }),
    defineField({ name: 'interiorColour', title: 'Interior Colour', type: 'string' }),

    // 🔹 New Fields (SA-specific confidence features)
    defineField({
      name: 'serviceHistory',
      title: 'Service History',
      type: 'string',
      options: {
        list: ['Full Service History', 'Partial', 'None', 'Unknown'],
      },
    }),
    defineField({
      name: 'accidentHistory',
      title: 'Accident History',
      type: 'string',
      options: {
        list: ['None', 'Minor', 'Major', 'Unknown'],
      },
    }),
    defineField({
      name: 'condition',
      title: 'Vehicle Condition',
      type: 'string',
      options: {
        list: ['Excellent', 'Good', 'Fair', 'Needs Work'],
      },
    }),
    defineField({
      name: 'registrationNumber',
      title: 'Registration Number',
      type: 'string',
      hidden: true, // 🔐 Internal use for moderation/verification
    }),
    defineField({
      name: 'vinNumber',
      title: 'VIN Number',
      type: 'string',
      hidden: true, // 🔐 Optional, admin-only or API-backed
    }),

    // 🔹 B2B / dealer functionality
    defineField({
      name: 'dealerName',
      title: 'Dealer Name',
      type: 'string',
    }),
    defineField({
      name: 'dealerLicenseNumber',
      title: 'Dealer License Number',
      type: 'string',
    }),
    defineField({
      name: 'isFleetVehicle',
      title: 'Fleet / Commercial Vehicle',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isVATInclusive',
      title: 'Price Includes VAT',
      type: 'boolean',
      initialValue: true,
    }),

    // 🔹 Listing presentation
    defineField({
      name: 'images',
      title: 'Vehicle Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'videos',
      title: 'Vehicle Videos',
      type: 'array',
      // of: [{ type: 'mux.video' }],
      of: [{ type: 'reference', to: [{ type: 'videoFile' }] }],

    }),

    // 🔹 Location
    defineField({ name: 'province', title: 'Province', type: 'string' }),
    defineField({ name: 'suburb', title: 'Suburb / Area', type: 'string' }),
    defineField({ name: 'location', title: 'Location (Ref)', type: 'reference', to: [{ type: 'location' }] }),
    defineField({ name: 'geoLocation', title: 'GPS Coordinates', type: 'geopoint' }),

    // 🔹 Features
    defineField({
      name: 'features',
      title: 'Vehicle Features',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
        list: [
          'Aircon', 'Bluetooth', 'Leather Seats', 'Towbar', 'Navigation',
          'Electric Windows', 'ABS', 'Airbags', 'Cruise Control',
          'Keyless Entry', 'Sunroof', 'Alloy Wheels', 'Reverse Camera',
        ],
      },
    }),

    // 🔹 Sale context
    defineField({
      name: 'ownership',
      title: 'Ownership Type',
      type: 'string',
      options: {
        list: [
          { title: 'Private Seller', value: 'private' },
          { title: 'Dealer', value: 'dealer' },
        ],
      },
    }),
    defineField({
      name: 'isFinanceAvailable',
      title: 'Finance Available',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'tradeInAccepted',
      title: 'Trade-ins Accepted',
      type: 'boolean',
    }),
    defineField({
      name: 'contactName',
      title: 'Contact Name',
      type: 'string',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),

    // 🔹 Admin & metadata
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Sold', value: 'sold' },
          { title: 'Pending', value: 'pending' },
          { title: 'Rejected', value: 'rejected' },
        ],
      },
      initialValue: 'available',
    }),
    defineField({
      name: 'moderationNotes',
      title: 'Moderation Notes',
      type: 'text',
      hidden: true,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Listing',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'dateListed',
      title: 'Date Listed',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'expiryDate',
      title: 'Listing Expiry Date',
      type: 'datetime',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'suburb',
      media: 'images.0',
    },
  },
});
