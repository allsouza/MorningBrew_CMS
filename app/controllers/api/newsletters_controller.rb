class Api::NewslettersController < ApplicationController
    def index
        @newsletters = Newsletter.all
    end

    def show
        @newsletter = Newsletter.find(params[:id])
    end

    def create
        @newsletter = Newsletter.new(newsletter_params)
        @newsletter.author_id = 1 # current_user.id
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
        @newsletter.destroy
    end

    private
    def newsletter_params
        params.require(:newsletter).permit(:date, :html)
    end
end