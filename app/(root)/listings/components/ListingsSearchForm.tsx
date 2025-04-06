import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { searchFormSchema } from '@/lib/validations/formValidations';
import { z } from 'zod';
import Input from '@/components/Input';
import Select from '@/components/Select';
import Button from '@/components/Buttons';
import Breadcrumbs from '@/components/Breadcrumbs';
import styles from './ListingsSearchForm.module.scss'; // Updated import

type FormValues = z.infer<typeof searchFormSchema>;

interface ListingsSearchFormProps {
  onSubmit: (data: FormValues) => void;
}

export default function ListingsSearchForm({ onSubmit }: ListingsSearchFormProps) {
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(searchFormSchema),
  });

  const onError = (errors: any) => console.log('Form errors', errors);

  return (
    <form
      id="Listings Search"
      className={styles.searchContainer}
      onSubmit={handleSubmit(onSubmit, onError)}
      noValidate
    >
      <fieldset className={styles.search}>
        <div className={styles.categories}>
          <Select
            options={["All Categories", "Properties", "Vehicles", "Jobs", "Services"]}
            initialValue="All Categories"
            selectSize="large"
            label="Provinces"
            id="provinces"
            name="provinces"
            ariaLabel="Provinces"
            required={true}
          />
        </div>
        
        <div className={styles.searchTerm}>
          <p className={styles.errorMessage}>{errors.searchTerm?.message}</p>
          <div className={`${styles.breadcrumbs} ${styles.searchTermBreadcrumbs}`}>
            <Breadcrumbs
              homeBreadcrumb={{ id: 1, name: "All Categories", href: "#" }}
              firstBreadcrumb={{ id: 2, name: "Electronics & Computers", href: "#" }}
              searchResult={{ id: 3, name: "Computer", href: "#" }}
            />
          </div>
          <div className={styles.searchTermInputContainer}>
            <Input
              className={`${styles.searchTermInput}`} // Removed formInput class as it's not in new SCSS
              isSearchBar={true}
              inputSize="large"
              inputType="text"
              label="Search Field: "
              placeholder="What are you looking for?"
              id="searchTerm"
              ariaLabel="Search Term"
              required={true}
              {...register("searchTerm")}
              onChange={(e) => setValue("searchTerm", e.target.value, { shouldDirty: true })}
            />
          </div>
        </div>

        <div className={styles.location}>
          <p className={styles.errorMessage}>{errors.locationSearch?.message}</p>
          <div className={`${styles.breadcrumbs} ${styles.locationBreadcrumbs}`}>
            <Breadcrumbs
              homeBreadcrumb={{ id: 4, name: "South Africa", href: "#" }}
              firstBreadcrumb={{ id: 5, name: "Gauteng", href: "#" }}
              secondBreadcrumb={{ id: 6, name: "Johannesburg", href: "#" }}
              searchResult={{ id: 7, name: "Sandton", href: "#" }}
            />
          </div>
          <div className={styles.locationInputContainer}>
            <Input
              className={`${styles.locationInput}`} // Removed formInput class
              isSearchBar={true}
              inputSize="large"
              inputType="text"
              label="Location: "
              placeholder="Search by city, province, township..."
              id="LocationSearch"
              ariaLabel="Location"
              required
              {...register("locationSearch")}
              onChange={(e) => setValue("locationSearch", e.target.value, { shouldDirty: true })}
            />
          </div>
        </div>
      </fieldset>
      
      <div className={styles.searchButton}>
        <Button
          buttonChildren="Search"
          className={styles.search}
          buttonType="normal"
          buttonSize="large"
          name='search'
          autoFocus={false}
          type="submit"
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
}