export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      activity_log: {
        Row: {
          action: string
          changes: Json | null
          created_at: string | null
          entity_id: string | null
          entity_type: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          action: string
          changes?: Json | null
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          action?: string
          changes?: Json | null
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      actual_revenue: {
        Row: {
          bengaluru_revenue: number | null
          created_at: string | null
          id: string
          month: string
          mumbai_revenue: number | null
          notes: string | null
          total_revenue: number
          updated_at: string | null
          year: number
        }
        Insert: {
          bengaluru_revenue?: number | null
          created_at?: string | null
          id?: string
          month: string
          mumbai_revenue?: number | null
          notes?: string | null
          total_revenue: number
          updated_at?: string | null
          year: number
        }
        Update: {
          bengaluru_revenue?: number | null
          created_at?: string | null
          id?: string
          month?: string
          mumbai_revenue?: number | null
          notes?: string | null
          total_revenue?: number
          updated_at?: string | null
          year?: number
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          changes: Json | null
          created_at: string | null
          id: string
          record_id: string | null
          table_name: string
          user_id: string | null
        }
        Insert: {
          action: string
          changes?: Json | null
          created_at?: string | null
          id?: string
          record_id?: string | null
          table_name: string
          user_id?: string | null
        }
        Update: {
          action?: string
          changes?: Json | null
          created_at?: string | null
          id?: string
          record_id?: string | null
          table_name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_segments: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      execution_plans: {
        Row: {
          created_at: string | null
          expected_outcome: string | null
          focus_area: string
          id: string
          month_id: string | null
          tactics: string | null
          updated_at: string | null
          week: number | null
        }
        Insert: {
          created_at?: string | null
          expected_outcome?: string | null
          focus_area: string
          id?: string
          month_id?: string | null
          tactics?: string | null
          updated_at?: string | null
          week?: number | null
        }
        Update: {
          created_at?: string | null
          expected_outcome?: string | null
          focus_area?: string
          id?: string
          month_id?: string | null
          tactics?: string | null
          updated_at?: string | null
          week?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "execution_plans_month_id_fkey"
            columns: ["month_id"]
            isOneToOne: false
            referencedRelation: "monthly_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      expiration_notes: {
        Row: {
          associate_name: string | null
          created_at: string | null
          created_by: string | null
          custom_fields: Json | null
          expiration_id: string
          id: string
          internal_notes: string | null
          priority: string | null
          remarks: string | null
          stage: string | null
          status: string | null
          tags: string[] | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          associate_name?: string | null
          created_at?: string | null
          created_by?: string | null
          custom_fields?: Json | null
          expiration_id: string
          id?: string
          internal_notes?: string | null
          priority?: string | null
          remarks?: string | null
          stage?: string | null
          status?: string | null
          tags?: string[] | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          associate_name?: string | null
          created_at?: string | null
          created_by?: string | null
          custom_fields?: Json | null
          expiration_id?: string
          id?: string
          internal_notes?: string | null
          priority?: string | null
          remarks?: string | null
          stage?: string | null
          status?: string | null
          tags?: string[] | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expiration_notes_expiration_id_fkey"
            columns: ["expiration_id"]
            isOneToOne: false
            referencedRelation: "expirations"
            referencedColumns: ["unique_id"]
          },
        ]
      }
      expirations: {
        Row: {
          assigned_associate: string | null
          created_at: string | null
          current_usage: string | null
          email: string | null
          end_date: string
          end_date_ts: string | null
          first_name: string | null
          frozen: string | null
          home_location: string | null
          id: string
          last_name: string | null
          member_id: string | null
          membership_id: string | null
          membership_name: string | null
          order_at: string | null
          order_at_ts: string | null
          order_id: string | null
          paid: string | null
          revenue: string | null
          sold_by: string | null
          status: string | null
          sync_date: string | null
          unique_id: string
          updated_at: string | null
        }
        Insert: {
          assigned_associate?: string | null
          created_at?: string | null
          current_usage?: string | null
          email?: string | null
          end_date: string
          end_date_ts?: string | null
          first_name?: string | null
          frozen?: string | null
          home_location?: string | null
          id?: string
          last_name?: string | null
          member_id?: string | null
          membership_id?: string | null
          membership_name?: string | null
          order_at?: string | null
          order_at_ts?: string | null
          order_id?: string | null
          paid?: string | null
          revenue?: string | null
          sold_by?: string | null
          status?: string | null
          sync_date?: string | null
          unique_id: string
          updated_at?: string | null
        }
        Update: {
          assigned_associate?: string | null
          created_at?: string | null
          current_usage?: string | null
          email?: string | null
          end_date?: string
          end_date_ts?: string | null
          first_name?: string | null
          frozen?: string | null
          home_location?: string | null
          id?: string
          last_name?: string | null
          member_id?: string | null
          membership_id?: string | null
          membership_name?: string | null
          order_at?: string | null
          order_at_ts?: string | null
          order_id?: string | null
          paid?: string | null
          revenue?: string | null
          sold_by?: string | null
          status?: string | null
          sync_date?: string | null
          unique_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      follow_ups: {
        Row: {
          associate_name: string | null
          comment: string | null
          contacted_on: string | null
          created_at: string | null
          created_by: string | null
          date: string | null
          expiration_id: string
          id: string
          note_id: string
        }
        Insert: {
          associate_name?: string | null
          comment?: string | null
          contacted_on?: string | null
          created_at?: string | null
          created_by?: string | null
          date?: string | null
          expiration_id: string
          id?: string
          note_id: string
        }
        Update: {
          associate_name?: string | null
          comment?: string | null
          contacted_on?: string | null
          created_at?: string | null
          created_by?: string | null
          date?: string | null
          expiration_id?: string
          id?: string
          note_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "follow_ups_expiration_id_fkey"
            columns: ["expiration_id"]
            isOneToOne: false
            referencedRelation: "expirations"
            referencedColumns: ["unique_id"]
          },
          {
            foreignKeyName: "follow_ups_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "expiration_notes"
            referencedColumns: ["id"]
          },
        ]
      }
      frozen_memberships: {
        Row: {
          created_at: string | null
          email: string | null
          first_name: string | null
          frozen_at: string | null
          home_location: string | null
          id: number
          last_name: string | null
          member_id: number
          membership_name: string | null
          revenue: number | null
          sync_date: string | null
          unfreeze_at: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          frozen_at?: string | null
          home_location?: string | null
          id?: number
          last_name?: string | null
          member_id: number
          membership_name?: string | null
          revenue?: number | null
          sync_date?: string | null
          unfreeze_at?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          frozen_at?: string | null
          home_location?: string | null
          id?: number
          last_name?: string | null
          member_id?: number
          membership_name?: string | null
          revenue?: number | null
          sync_date?: string | null
          unfreeze_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      location_strategy: {
        Row: {
          allocated_target: number | null
          allocation_percentage: number
          created_at: string | null
          id: string
          location_id: string | null
          month_id: string | null
          updated_at: string | null
        }
        Insert: {
          allocated_target?: number | null
          allocation_percentage: number
          created_at?: string | null
          id?: string
          location_id?: string | null
          month_id?: string | null
          updated_at?: string | null
        }
        Update: {
          allocated_target?: number | null
          allocation_percentage?: number
          created_at?: string | null
          id?: string
          location_id?: string | null
          month_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "location_strategy_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "location_strategy_month_id_fkey"
            columns: ["month_id"]
            isOneToOne: false
            referencedRelation: "monthly_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          city: string
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          state: string | null
          updated_at: string | null
        }
        Insert: {
          city: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          state?: string | null
          updated_at?: string | null
        }
        Update: {
          city?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          state?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      monthly_performance: {
        Row: {
          achievement_percentage: number | null
          actual_customer_count: number | null
          actual_revenue: number | null
          created_at: string | null
          id: string
          location_id: string | null
          month_id: string | null
          notes: string | null
          updated_at: string | null
        }
        Insert: {
          achievement_percentage?: number | null
          actual_customer_count?: number | null
          actual_revenue?: number | null
          created_at?: string | null
          id?: string
          location_id?: string | null
          month_id?: string | null
          notes?: string | null
          updated_at?: string | null
        }
        Update: {
          achievement_percentage?: number | null
          actual_customer_count?: number | null
          actual_revenue?: number | null
          created_at?: string | null
          id?: string
          location_id?: string | null
          month_id?: string | null
          notes?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "monthly_performance_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "monthly_performance_month_id_fkey"
            columns: ["month_id"]
            isOneToOne: false
            referencedRelation: "monthly_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      monthly_plans: {
        Row: {
          bengaluru_target: number
          context: string | null
          created_at: string | null
          focus: string
          half: string
          hero_offer: string
          historic_baseline: number
          id: string
          is_anniversary: boolean | null
          month: string
          mumbai_target: number
          pricing_note: string | null
          short_month: string
          target: number
          theme: string
          updated_at: string | null
          year: number
        }
        Insert: {
          bengaluru_target: number
          context?: string | null
          created_at?: string | null
          focus: string
          half: string
          hero_offer: string
          historic_baseline: number
          id?: string
          is_anniversary?: boolean | null
          month: string
          mumbai_target: number
          pricing_note?: string | null
          short_month: string
          target: number
          theme: string
          updated_at?: string | null
          year: number
        }
        Update: {
          bengaluru_target?: number
          context?: string | null
          created_at?: string | null
          focus?: string
          half?: string
          hero_offer?: string
          historic_baseline?: number
          id?: string
          is_anniversary?: boolean | null
          month?: string
          mumbai_target?: number
          pricing_note?: string | null
          short_month?: string
          target?: number
          theme?: string
          updated_at?: string | null
          year?: number
        }
        Relationships: []
      }
      monthly_targets: {
        Row: {
          bengaluru_last_year: number
          bengaluru_target: number
          context: string | null
          created_at: string | null
          focus: string | null
          hero_offer: string | null
          historic_baseline: number
          id: string
          is_anniversary: boolean | null
          last_year_revenue: number
          month: string
          mumbai_last_year: number
          mumbai_target: number
          pricing_note: string | null
          quarter: string
          target_revenue: number
          theme: string | null
          updated_at: string | null
          year: number
        }
        Insert: {
          bengaluru_last_year: number
          bengaluru_target: number
          context?: string | null
          created_at?: string | null
          focus?: string | null
          hero_offer?: string | null
          historic_baseline: number
          id?: string
          is_anniversary?: boolean | null
          last_year_revenue: number
          month: string
          mumbai_last_year: number
          mumbai_target: number
          pricing_note?: string | null
          quarter: string
          target_revenue: number
          theme?: string | null
          updated_at?: string | null
          year?: number
        }
        Update: {
          bengaluru_last_year?: number
          bengaluru_target?: number
          context?: string | null
          created_at?: string | null
          focus?: string | null
          hero_offer?: string | null
          historic_baseline?: number
          id?: string
          is_anniversary?: boolean | null
          last_year_revenue?: number
          month?: string
          mumbai_last_year?: number
          mumbai_target?: number
          pricing_note?: string | null
          quarter?: string
          target_revenue?: number
          theme?: string | null
          updated_at?: string | null
          year?: number
        }
        Relationships: []
      }
      offer_performance: {
        Row: {
          conversion_rate: number | null
          created_at: string | null
          id: string
          month: string
          notes: string | null
          offer_id: string | null
          revenue_generated: number | null
          units_sold: number | null
          updated_at: string | null
          year: number
        }
        Insert: {
          conversion_rate?: number | null
          created_at?: string | null
          id?: string
          month: string
          notes?: string | null
          offer_id?: string | null
          revenue_generated?: number | null
          units_sold?: number | null
          updated_at?: string | null
          year: number
        }
        Update: {
          conversion_rate?: number | null
          created_at?: string | null
          id?: string
          month?: string
          notes?: string | null
          offer_id?: string | null
          revenue_generated?: number | null
          units_sold?: number | null
          updated_at?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "offer_performance_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "sales_offers"
            referencedColumns: ["id"]
          },
        ]
      }
      plan_versions: {
        Row: {
          change_description: string | null
          created_at: string | null
          created_by: string | null
          id: string
          month_id: string | null
          plan_data: Json
          version_number: number
        }
        Insert: {
          change_description?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          month_id?: string | null
          plan_data: Json
          version_number: number
        }
        Update: {
          change_description?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          month_id?: string | null
          plan_data?: Json
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "plan_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plan_versions_month_id_fkey"
            columns: ["month_id"]
            isOneToOne: false
            referencedRelation: "monthly_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          associate_name: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          is_admin: boolean | null
          updated_at: string | null
        }
        Insert: {
          associate_name?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          is_admin?: boolean | null
          updated_at?: string | null
        }
        Update: {
          associate_name?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_admin?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      revenue_breakdown: {
        Row: {
          created_at: string | null
          id: string
          location_id: string | null
          month_id: string | null
          offer_id: string | null
          revenue_amount: number | null
          unit_count: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          location_id?: string | null
          month_id?: string | null
          offer_id?: string | null
          revenue_amount?: number | null
          unit_count?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          location_id?: string | null
          month_id?: string | null
          offer_id?: string | null
          revenue_amount?: number | null
          unit_count?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "revenue_breakdown_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "revenue_breakdown_month_id_fkey"
            columns: ["month_id"]
            isOneToOne: false
            referencedRelation: "monthly_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      risk_assessments: {
        Row: {
          created_at: string | null
          id: string
          impact: string
          mitigation: string
          month_id: string | null
          probability: string
          risk: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          impact: string
          mitigation: string
          month_id?: string | null
          probability: string
          risk: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          impact?: string
          mitigation?: string
          month_id?: string | null
          probability?: string
          risk?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "risk_assessments_month_id_fkey"
            columns: ["month_id"]
            isOneToOne: false
            referencedRelation: "monthly_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_offers: {
        Row: {
          audience: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          is_cancelled: boolean | null
          month: string
          notes: string | null
          offer_name: string
          offer_type: string
          package_mechanics: string | null
          pricing_breakdown: string | null
          updated_at: string | null
          why_it_works: string | null
          year: number
        }
        Insert: {
          audience?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          is_cancelled?: boolean | null
          month: string
          notes?: string | null
          offer_name: string
          offer_type: string
          package_mechanics?: string | null
          pricing_breakdown?: string | null
          updated_at?: string | null
          why_it_works?: string | null
          year?: number
        }
        Update: {
          audience?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          is_cancelled?: boolean | null
          month?: string
          notes?: string | null
          offer_name?: string
          offer_type?: string
          package_mechanics?: string | null
          pricing_breakdown?: string | null
          updated_at?: string | null
          why_it_works?: string | null
          year?: number
        }
        Relationships: []
      }
      segment_performance: {
        Row: {
          acquired_customers: number | null
          created_at: string | null
          id: string
          month_id: string | null
          revenue_from_segment: number | null
          segment_id: string | null
          target_customers: number | null
          updated_at: string | null
        }
        Insert: {
          acquired_customers?: number | null
          created_at?: string | null
          id?: string
          month_id?: string | null
          revenue_from_segment?: number | null
          segment_id?: string | null
          target_customers?: number | null
          updated_at?: string | null
        }
        Update: {
          acquired_customers?: number | null
          created_at?: string | null
          id?: string
          month_id?: string | null
          revenue_from_segment?: number | null
          segment_id?: string | null
          target_customers?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "segment_performance_month_id_fkey"
            columns: ["month_id"]
            isOneToOne: false
            referencedRelation: "monthly_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "segment_performance_segment_id_fkey"
            columns: ["segment_id"]
            isOneToOne: false
            referencedRelation: "customer_segments"
            referencedColumns: ["id"]
          },
        ]
      }
      strategic_plans: {
        Row: {
          bengaluru_total: number
          created_at: string | null
          half: string
          id: string
          mumbai_total: number
          title: string
          total_baseline: number
          total_target: number
          updated_at: string | null
          year: number
        }
        Insert: {
          bengaluru_total: number
          created_at?: string | null
          half: string
          id?: string
          mumbai_total: number
          title: string
          total_baseline: number
          total_target: number
          updated_at?: string | null
          year: number
        }
        Update: {
          bengaluru_total?: number
          created_at?: string | null
          half?: string
          id?: string
          mumbai_total?: number
          title?: string
          total_baseline?: number
          total_target?: number
          updated_at?: string | null
          year?: number
        }
        Relationships: []
      }
      strategy_core_points: {
        Row: {
          created_at: string | null
          id: string
          point_order: number
          strategy_id: string | null
          strategy_point: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          point_order: number
          strategy_id?: string | null
          strategy_point: string
        }
        Update: {
          created_at?: string | null
          id?: string
          point_order?: number
          strategy_id?: string | null
          strategy_point?: string
        }
        Relationships: [
          {
            foreignKeyName: "strategy_core_points_strategy_id_fkey"
            columns: ["strategy_id"]
            isOneToOne: false
            referencedRelation: "strategic_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      user_notes: {
        Row: {
          category: string | null
          created_at: string | null
          created_by: string | null
          id: string
          month: string | null
          note_text: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          month?: string | null
          note_text: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          month?: string | null
          note_text?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      active_offers_summary: {
        Row: {
          active_offers: number | null
          cancelled_offers: number | null
          month: string | null
          offers_with_notes: number | null
          total_offers: number | null
          year: number | null
        }
        Relationships: []
      }
      performance_achievement: {
        Row: {
          achievement_percentage: number | null
          actual_revenue: number | null
          month: string | null
          target: number | null
          variance: number | null
          year: number | null
        }
        Relationships: []
      }
      quarterly_summary: {
        Row: {
          bengaluru_total: number | null
          growth_percentage: number | null
          month_count: number | null
          mumbai_total: number | null
          quarter: string | null
          total_baseline: number | null
          total_target: number | null
          year: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_expirations_by_date_range: {
        Args: { p_end_date: string; p_start_date: string }
        Returns: {
          assigned_associate: string
          current_usage: string
          email: string
          end_date: string
          first_name: string
          frozen: string
          home_location: string
          last_name: string
          member_id: string
          membership_id: string
          membership_name: string
          order_at: string
          paid: string
          revenue: string
          sold_by: string
          status: string
          unique_id: string
        }[]
      }
      get_expirations_with_notes: {
        Args: never
        Returns: {
          assigned_associate: string
          current_usage: string
          email: string
          end_date: string
          first_name: string
          frozen: string
          home_location: string
          id: string
          last_name: string
          member_id: string
          membership_id: string
          membership_name: string
          note_associate_name: string
          note_created_at: string
          note_id: string
          note_internal_notes: string
          note_priority: string
          note_remarks: string
          note_stage: string
          note_status: string
          note_tags: string[]
          order_at: string
          paid: string
          revenue: string
          sold_by: string
          status: string
          unique_id: string
        }[]
      }
      get_monthly_performance: {
        Args: { p_month: string; p_year: number }
        Returns: {
          actual: number
          target: number
          variance: number
          variance_percentage: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
