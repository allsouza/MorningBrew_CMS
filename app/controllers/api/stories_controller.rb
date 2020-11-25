class Api::StoriesController < ApplicationController
    def index
        @stories = Story.all.includes(:newsletters)
    end

    def show
        @story = Story.find(params[:id])
    end

    def create
        @story = Story.new(story_params)
        @story.author_id = current_user.id
        if @story.save
            @story.createAPI
            render :show
        else
            render json: @story.errors.full_messages, status: 422
        end
    end

    def update
        @story = Story.find(params[:id])
        if @story.update(story_params)
            @story.updateAPI
            render :show
        else
            render json: @story.errors.full_messages, status: 422
        end
    end

    def destroy
        @story = Story.find(params[:id])
        if @story
            @story.destroy
            @story.deleteAPI
            render json: {success: "story destroyed"}, status: 200
        else
            render json: {error: "story not found"}, status: 422
        end
    end

    private
    def story_params
        params.require(:story).permit(:title, :html, :tag, :body)
    end
end