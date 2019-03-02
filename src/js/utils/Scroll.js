export const scrollIntoView = ref => {
    if(ref && ref.current) {
        ref.current.scrollIntoView({ block: "end", behavior: "smooth" });
    }
};
