class Api::NewslettersController < ApplicationController
    def index
        @newsletters = Newsletter.all
    end

    def show
        @newsletter = Newsletter.find(params[:id])
    end

    def create
        @newsletter = Newsletter.new(newsletter_params)
        @newsletter.author_id = current_user.id
        if @newsletter.save
            render :show
        else
            render json: @newsletter.errors.full_messages, status: 422
        end
    end

    def update
        @newsletter = Newsletter.find(params[:id])
        if @newsletter.update(newsletter_params)
            render :show
        else
            render json: @newsletter.errors.full_messages, status: 422
        end
    end

    def destroy
        @newsletter = Newsletter.find(params[:id])
        if @newsletter
            @newsletter.destroy
            render json: {success: "newsletter destroyed"}, status: 200
        else
            render json: {error: "newsletter not found"}, status: 422
        end
    end

    private
    def newsletter_params
        params.require(:newsletter).permit(:date, :html, :story_order)
    end
end