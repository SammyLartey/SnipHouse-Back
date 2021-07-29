import { ADD_BLOG, DELETE_BLOG, FETCH_BLOGS } from '../actions/types';

let INITIAL_STATE = {
    blogs: []
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case ADD_BLOG:
            let new_blogs = state.blogs.concat(action.data);

            return { ...state, blogs: new_blogs, loading: false };
        case DELETE_BLOG:
            let new_blog = state.blogs.filter(
                deletedBlog => deletedBlog.id !== action.data
            );

            return { ...state, blogs: new_blog, loading: false };
        case FETCH_BLOGS:
            let tempBlog = action.blogs;

            return {
                ...state,

                blogs: tempBlog
            };
        default:
            return state;
    }
}
