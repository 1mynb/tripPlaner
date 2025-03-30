import * as yup from 'yup'

export const PromptsSchema = yup.object().shape({
    current_location: yup.string().required('* current location required'),
    pickup_location: yup.string().required('* pickup location required'),
    dropoff_location: yup.string().required('* dropoff location required'),
    current_cycle_used: yup.number()
                            .lessThan(70, 'Trip exceeds FMCSA 70-hour rule')
                            .required('* current cycle used required')
                        
   
});

