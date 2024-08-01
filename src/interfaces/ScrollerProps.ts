export interface ScrollerProps<Item> {
    /**
     * If there is more data to load in the upward direction
     * @default false If true, then the {@link nextSkeleton} will be shown
     */
    hasMoreNextData: boolean;
    
    /**
     * If there is more data to load in the downward direction
     * @default false If true, then the {@link previousSkeleton} will be shown
     */
    hasMorePreviousData: boolean;
    
    /**
     * The function called when more data is to be loaded upwards
     */
    nextData: () => void;

    loadData: () => void;
    
    /**
     * The function called when more data is to be loaded downwards
     */
    previousData: () => void;
    
    /**
     * The skeleton component to be shown when {@link hasMoreNextData} is true
     */
    nextSkeleton?: React.ReactNode;
    
    /**
     * The skeleton component to be shown when {@link hasMorePreviousData} is true
     */
    previousSkeleton?: React.ReactNode;
    
    /**
     * The percentage the user has to scroll to, before we pre-fetch more data upwards
     * 0 = 0%, 1 = 100%
     */
    nextThreshold?: number;
    
    /**
     * The percentage the user has to scroll to, before we pre-fetch more data downwards
     * 0 = 0%, 1 = 100%
     */
    previousThreshold?: number;
    
    /**
     * The data to be rendered
     */
    data: Item[];
    
    /**
     * Function to render an item
     */
    renderItem: (item: Item) => React.ReactNode;
  }
  