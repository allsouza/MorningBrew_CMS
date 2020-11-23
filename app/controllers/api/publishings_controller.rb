class Api::PublishingsController < ApplicationController
    def create
        @publishing = Publishing.new(publishing_params)
        if @publishing.save()
            render json: {success: publishing_params}, status: 200
        else
            render json: @publishing.errors.full_messages, status: 422
        end
    end

    def destroy
        @publishing = Publishing.find_by(story_id: params[:story_id], newsletter_id: params[:newsletter_id])
        debugger
        if @publishing
            @publishing.destroy
            render json: {success: "publishing destroyed"}, status: 200
        else
            render json: {error: "publishing not found"}, status: 422
        end
    end

    private
    def publishing_params
        params.require(:publishing).permit(:story_id, :newsletter_id)
    end
end